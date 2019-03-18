const { getProfile } = require('./profile');
const base = "https://www.instagram.com/";
const gqlUri = "https://www.instagram.com/graphql/query"
const rp = require('request-promise');
const LIMIT_QUERY = 500;

exports.lite = async (username, options) => {
    try {
        let profile = await getProfile(base + username);
        if (profile !== false) {
            if (options.raw === true) {
                return profile.graphql.user;
            } else {
                let mediaLite = [];
                let media = profile.graphql.user.edge_owner_to_timeline_media.edges;
                for (let i = 0; i < media.length; i++) {
                    mediaLite.push(media[i].node.display_url)
                }
                return {
                    total: mediaLite.length,
                    user_id: profile.graphql.user.id,
                    user_name: profile.graphql.user.username,
                    media: mediaLite
                };
            }
        } else {
            throw new Error("Private profile or account not found");
        }
    } catch (error) {
        throw error;
    }
}

exports.pull = async params => {
    try {
        let profile = await getProfile(base + params.username);
        let options = {
            uri: gqlUri,
            qs: {
                query_hash: params.query_hash,
                first: params.media_count,
                id: profile.graphql.user.id
            },
            headers: {
                'user_agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.3",
                'cookie': params.cookie
            },
            json: true
        };

        if (params.media_count <= 50) {
            let media = await rp(options);
            return media;
        } else {
            let endCursor = profile.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
            let hasNextPage = profile.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page;
            let rParams = {
                endCursor, hasNextPage
            }
            let media = await pullAllMedia(rParams, options);
            if (params.raw === false) {
                let m = [];
                let edges = media.data.user.edge_owner_to_timeline_media.edges;
                for (let i = 0; i < edges.length; i++) {
                    m.push(edges[i].node.display_url)
                }
                return m;
            } else
                return media;
        }

    } catch (error) {
        throw error;
    }
}


pullAllMedia = async (params, options) => {
    try {
        let mediaLimit = options.qs.first;
        if (mediaLimit > LIMIT_QUERY)
            mediaLimit = LIMIT_QUERY;
        let endCursor = params.endCursor;
        let hasNextPage = params.hasNextPage;
        options.qs.after = endCursor;
        options.qs.first = 50;
        let results = [];
        let r;
        while (hasNextPage) {
            let result = await rp(options);
            const pageInfo = result.data.user.edge_owner_to_timeline_media.page_info;
            hasNextPage = pageInfo.has_next_page
            endCursor = pageInfo.end_cursor;
            let edges = result.data.user.edge_owner_to_timeline_media.edges;
            results.push.apply(results, edges);
            if (results.length >= mediaLimit) {
                r = result;
                break;
            }

        }
        r.data.user.edge_owner_to_timeline_media.edges = results;
        return r;
    } catch (error) {
        throw error;
    }

}
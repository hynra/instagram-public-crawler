const crawler = require('./src');

loadLite = async () => {
    try {
        let media = await crawler.lite("permanahendra", { raw: false });
        console.log(JSON.stringify(media));
    } catch (error) {
        console.log(error)
    }
}

load = async () => {
    try {
        let options = {
            raw: false,
            username: 'permanahendra',
            query_hash: 'f2405b236d85e8296cf30347c9f08c2a',
            media_count: 101,
            cookie: ''
        }
        let media = await crawler.start(options);
        if (options.raw)
            console.log(JSON.stringify(media.data.user.edge_owner_to_timeline_media.edges.length));
        else
            console.log(media.length)
    } catch (error) {
        console.log(error)
    }
}

loadLite();
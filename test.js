const profile = require('./profile');
const rp = require('request-promise');

profile.getProfile("https://www.instagram.com/permanahendra/")
    .then(result => {
        if (result) {
            let media = result.graphql.user.edge_owner_to_timeline_media.edges;
            for(let i = 0; i< media.length; i++){
                //console.log(media[i].node.display_url);
            }
        }
        let options = {
            uri: 'https://www.instagram.com/graphql/query',
            qs: {
                query_hash: "472f257a40c653c64c666ce877d59d2b",
                first: 12,
                id: "175641929"
            },
            headers: {
                'user_agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.3",
                'cookie': "csrftoken=7b8rpEE0Gl85fcKBalgGvRF5diWsjrmH"
            },
            json: true
        };
        return rp(options)
    })
    .then( data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
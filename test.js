const profile = require('./profile');
const rp = require('request-promise');
const FileCookieStore = require('tough-cookie-filestore');

profile.getProfile("https://www.instagram.com/crazy.animal.videos/")
    .then(result => {
        if (result) {
            let media = result.graphql.user.edge_owner_to_timeline_media.edges;
            for (let i = 0; i < media.length; i++) {
                //console.log(media[i].node.display_url);
            }
        }
        /*let options = {
            uri: 'https://www.instagram.com/graphql/query',
            qs: {
                query_hash: "472f257a40c653c64c666ce877d59d2b",
                first: 12,
                id: "175641929"
            },
            headers: {
                'user_agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.3",
                'cookie': 'mid=W1X1XQALAAHJWRjBTgzM3UFeWkmt; mcd=3; datr=NQKFWxY73YsDC81ikryvMSy0; csrftoken=n8Kuf8UEN4jFyVUIysZ7ObSwZ6U1XX2x; fbm_124024574287414=base_domain=.instagram.com; csrftoken=7b8rpEE0Gl85fcKBalgGvRF5diWsjrmH; ds_user_id=175641929; sessionid=175641929%3AEPkOIcrX0S3oMf%3A15; shbid=5747; shbts=1552827697.2306864; rur=ATN; urlgen="{"\114.124.239.188\": 23693\054 \"114.124.215.29\": 23693}:1h5gIU:NbF4t2aiuX_X-KCjJTIGHXkcTPg'
            },
            json: true
        };
        return rp(options)*/
        const j = rp.jar(new FileCookieStore('cookies.json'))

        let options = {
            method: 'GET',
            uri: 'https://www.instagram.com/permanahendra/',
            json: true,
            resolveWithFullResponse: true,
            jar: j,
            followAllRedirects: false
        };
        return rp(options)
    })
    .then(data => {
        const j = rp.jar();
        const cookie_string = j.getCookieString('https://www.instagram.com/permanahendra/');
        const _cookies = j.getCookies('https://www.instagram.com/permanahendra/');
        let cookies = data.headers['set-cookie'];
        console.log(_cookies);
        let pureCookies;
        for (let i = 0; i < cookies.length; i++) {
            //console.log(cookies[i])
            pureCookies += cookies[i]
            if (i !== cookies.length - 1) {
                pureCookies += "; "
            }
        }
        //console.log(pureCookies)

        let options = {
            uri: 'https://www.instagram.com/graphql/query',
            qs: {
                query_hash: "472f257a40c653c64c666ce877d59d2b",
                first: 50,
                id: "175641929"
            },
            headers: {
                'user_agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.3",
                'cookie': 'mid=W1X1XQALAAHJWRjBTgzM3UFeWkmt; mcd=3; datr=NQKFWxY73YsDC81ikryvMSy0; csrftoken=n8Kuf8UEN4jFyVUIysZ7ObSwZ6U1XX2x; fbm_124024574287414=base_domain=.instagram.com; csrftoken=7b8rpEE0Gl85fcKBalgGvRF5diWsjrmH; ds_user_id=175641929; sessionid=175641929%3AEPkOIcrX0S3oMf%3A15; shbid=5747; shbts=1552827697.2306864; rur=ATN; urlgen="{"\114.124.239.188\": 23693\054 \"114.124.215.29\": 23693}:1h5gIU:NbF4t2aiuX_X-KCjJTIGHXkcTPg'
                //'Set-Cookie': cookies
            },
            json: true
        };
        return rp(options)
    })
    .then(data => {
        console.log(JSON.stringify(data))
    })
    .catch(err => {
        console.log(err)
    })
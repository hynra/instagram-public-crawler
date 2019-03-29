const crawler = require('./src');

loadLite = async () => {
    try {
        let media = await crawler.lite("agnioctx", { raw: false });
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
            cookie: 'mid=W1X1XQALAAHJWRjBTgzM3UFeWkmt; mcd=3; datr=NQKFWxY73YsDC81ikryvMSy0; csrftoken=n8Kuf8UEN4jFyVUIysZ7ObSwZ6U1XX2x; fbm_124024574287414=base_domain=.instagram.com; csrftoken=7b8rpEE0Gl85fcKBalgGvRF5diWsjrmH; ds_user_id=175641929; sessionid=175641929%3AEPkOIcrX0S3oMf%3A15; shbid=5747; shbts=1552827697.2306864; rur=ATN; urlgen="{"\114.124.239.188\": 23693\054 \"114.124.215.29\": 23693}:1h5gIU:NbF4t2aiuX_X-KCjJTIGHXkcTPg'
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
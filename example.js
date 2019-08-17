const dotenv = require('dotenv');
dotenv.config();
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
            username: 'invikard.demo',
            query_hash: 'f2405b236d85e8296cf30347c9f08c2a',
            media_count: -1,
            cookie: process.env.COOKIE
        }
        let media = await crawler.start(options);
        if (options.raw)
            console.log(JSON.stringify(media.data));
        else
            console.log(media.length)
    } catch (error) {
        console.log(error)
    }
}

load();
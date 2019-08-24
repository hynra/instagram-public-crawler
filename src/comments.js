let config = {
    cookie: "",
    query_id: "17852405266163336",
    shortcode: "",
    first: 30
}

let headers = {
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.3",
}

const rp = require('request-promise');
let base_url = 'https://www.instagram.com/graphql/query/'

module.exports = class Comments {



    constructor(_config) {
        config.cookie = (_config.cookie) ? _config.cookie : config.cookie;
        config.shortcode = (_config.shortcode) ? _config.cookie : config.shortcode;
        config.query_id = (_config.query_id) ? _config.query_id : config.query_id;
        config.first = (_config.first) ? _config.first : config.first;

        headers.cookie = config.cookie;
    }


    async getComments(params) {
        if (params.first) config.first = params.first;
        if (params.shortcode) config.shortcode = params.shortcode;
        
        let qs = {
            query_id: config.query_id,
            first: config.first,
            shortcode: config.shortcode
        }

        if(params.after) qs.after = params.after;

        let options = {
            uri: base_url,
            qs,
            headers,
            json: true
        };

        try {
            let result = await rp(options);
            return result;
        } catch (error) {
            throw error;
        }


    }



}
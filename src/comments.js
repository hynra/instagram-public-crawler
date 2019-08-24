let config = {
    cookie: "",
    query_id: "17852405266163336",
    short_code: "",
    first: 30
}

let headers = {
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.3",
}

const rp = require('request-promise');
let base_url = 'https://www.instagram.com/graphql/query/'

module.exports = class Comments{
    
    

    constructor (_config) {
        config.cookie = (_config.cookie) ? _config.cookie : config.cookie;
        config.short_code = (_config.short_code) ? _config.cookie : config.short_code;
        config.query_id = (_config.query_id) ? _config.query_id : config.query_id;
        config.first = (_config.first) ? _config.first : config.first;

        headers.cookie = config.cookie;
    }


    async getComments(params){
        if(params.first) config.first = params.first;
        if(params.short_code) config.short_code = params.short_code;

        let options = {
            uri: base_url,
            qs: {
                query_id: config.query_id,
                first: config.first,
                short_code: config.short_code
            },
            headers,
            json: true
        };

        let result = await rp(options);
        return result;

    }



}
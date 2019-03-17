let cheerio = require('cheerio');
const rp = require('request-promise');

getProfile = async (url) => {
    try {
        let html = await rp(url);
        let $ = cheerio.load(html);
        let data;
        for (let i = 0; i < $('script').length; i++) {
            if ($('script')[i].children.length > 0) {
                if ($('script')[i].children[0].data.startsWith("window._sharedData =")) {
                    data = $('script')[i].children[0].data;
                }
            }
        }
        if(data){
            data = data.replace("window._sharedData = ", "").slice(0, -1); 
            data = JSON.parse(data);
            let profile = data.entry_data.ProfilePage[0]
            //console.log(profile)
            return profile;
        }else{
            console.log("info not found");
            return false;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getProfile
}
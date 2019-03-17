const profile = require('./profile');

profile.getProfile("https://www.instagram.com/permanahendra/")
    .then(result => {
        if (result) {
            let media = result.graphql.user.edge_owner_to_timeline_media.edges;
            for(let i = 0; i< media.length; i++){
                console.log(media[i].node.display_url);
            }
        }
    }).catch(err => {
        console.log(err)
    })
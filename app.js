const acc = {
    username: "username",
    password: "password"
}

const Client = require('instagram-private-api').V1;
const device = new Client.Device(acc.username);
const storage = new Client.CookieFileStorage(__dirname + '/cookies/' + acc.username + '.json');
const _ = require('lodash');
const Promise = require('bluebird');

let session;

Client.Session.create(device, storage, acc.username, acc.password)
    .then(function (_session) {
        session = _session;
        return Client.Account.searchForUser(session, 'crazy.animal.videos');
    })
    .then(function (account) {
        return new Client.Account.getById(session, account.id);
    })
    .then(function (account) {
        const feed = new Client.Feed.UserMedia(session, account.id);
        Promise.mapSeries(_.range(0, 20), function () {
            return feed.get();
        }).then(function (results) {
            let media = _.flatten(results); 
            console.log(media)
        })
    })
    .catch(function (err) {
        console.log(err)
    });

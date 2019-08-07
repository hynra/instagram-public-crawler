# instagram-public-crawler
Get media feed of an Instagram public account

### Install

From npm: `npm install --save instagram-public-crawler`


### Usage

#### Minimal

Using `.lite()` to get media feed (only 25 media)

* Example

```javascript
const crawler = require('instagram-public-crawler');
await crawler.lite("permanahendra", { raw: false }); // using async await

crawler.lite("permanahendra", { raw: false }).then(result => {
            
}); // using promise
```

* Usage

   `.lite(<instagram_user_name>, options)`

* Options

   `raw` : `boolean` return raw result if true else only media
   
#### Advanced

Using `.start()` to get media feed (possible to get all media)

 * Example
 
 ```javascript
 let options = {
            raw: false,
            username: 'permanahendra',
            query_hash: 'f2405b236d85f8296cf30347g9f08c2a',
            media_count: 101,
            cookie: 'mid=W1X1XQALAAHJWRjBTgzM3UFeWkmt; mcd=3; datr=NQKFWxY73YsDC81ikryvMSy0; csrftoken=n8Kuf8UEN4jFyVUIysZ7ObSwZ6U1YX2x; fbm_124024574287414=base_domain=.instagram.com; csrftoken=7b8rpEE0Gl85fcKBalgGvRF5diWsjrmH; ds_user_id=1SD641929; sessionid=175641929%3AEPkOIsRX0S3oMf%3A15; shbid=5747; rur=ATN; shbts=1558734869.7421114; urlgen="{\"24.124.172.232\": 23693}:1hUIAS:6Q5ch4JClsyPEyL8yfeHqqDnxp1"'
        }
 let media = await crawler.start(options); // using async await
 
 crawler.start(options).then(result => {
            
 }); // using promise
 ```
 
 * Usage
 
   `.start(options)`
   
 * Options
   
   `raw` : `boolean` return raw result if true else only media feed
   
   `username` : Username of public instagram account
   
   `query_hash` : hash of instagram `GraphQL` query. See below for instructions.
   
   `media_count` : The amount of media you want to get. Use `-1` to get all media feed.
   
   `cookie`: See below for instructions.
 
 #### Get `query_hash`
 
 Open an public instagram account via Browser > *inspect element* > *Network* > copy query hash's value like image below
 
 <img src="https://github.com/hynra/instagram-public-crawler/raw/master/instagram_query_hash.PNG" width="70%" />
 
 
 #### Get `cookie`
 
 Open instagram web Browser > *inspect element* > *Network* > copy cookie from request header like image below
 
 <img src="https://github.com/hynra/instagram-public-crawler/raw/master/instagram_cookie.PNG" width="70%" />
 
 ### Note
 
 Both `cookie` and `query_hash` are valid for almost one year. So it's safe for long running job.
 
 
 ### Author
 
 Developed by <a href="https://github.com/hynra">@hynra</a> || <a href="https://hynra.id">Website</a>

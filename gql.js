const request = require('request-promise')

const USERNAME = 'permanahendra'
const profile = require('./profile');

const URL_PROFILE = `https://www.instagram.com/${USERNAME}/`
const URL_POSTS = 'https://www.instagram.com/graphql/query';
const rateLimit = 100


+async function(profileUrl, postsUrl) {
    try {
      //const resProfile = await http({
      //  uri: URL_PROFILE,
      //  json: true
      //})
      //const Profile = await insertOne(parseProfile(resProfile))
      const Profile = await profile.getProfile(URL_PROFILE)
      let hasNext = false
  
      //console.log(Profile)

      const query = {
        query_id: "17851374694183129",
        variables: JSON.stringify({
          id: Profile.graphql.user.id,
          first: 100
        })
      }
      let postWithObjectIDs = []
      do {
        console.log('Next Query', query)
        const resPosts = await http({
          uri: URL_POSTS,
          qs: query,
          json: true
        })
        resPosts['name'] = Profile.graphql.user.full_name;
        resPosts['username'] = Profile.graphql.user.username;
        resPosts['profile_display'] = Profile.graphql.user.biography;
  
        const Posts = parsePosts(resPosts)
        postWithObjectIDs = postWithObjectIDs.concat(await bulkUpdate(Posts))
  
        const pageInfo = resPosts['data']['user']['edge_owner_to_timeline_media']['page_info']
        hasNext = pageInfo['has_next_page']
  
        const nextQuery = Function(`return ${query.variables}`)()
        nextQuery.after = pageInfo['end_cursor']
        query.variables = JSON.stringify(nextQuery)
  
      } while (hasNext)
      //const alogliaResult = await insertObjects(postWithObjectIDs)
      console.log("itter")
    } catch (e) {
      console.log("Error::", e)
    }
  }(URL_PROFILE, URL_POSTS);

async function http(options = {}) {
    const defaults = {
        method: 'GET',
        uri: 'http://www.google.com',
        headers: {
            'Connection': 'close'
        },
        resolveWithFullResponse: true
    }
    const opts = Object.assign({}, defaults, options)
    try {
        const res = await request(opts)
        return res.body
    } catch (e) {
        console.log("Error::", e)
    }
}



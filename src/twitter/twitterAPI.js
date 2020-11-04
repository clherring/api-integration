const Twit = require("twit");
const { RESTDataSource } = require("apollo-datasource-rest");

class TwitterAPI extends RESTDataSource {
  constructor() {
    super();
    this.api = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });
  }

  followerCount(h) {
    const p = new Promise((resolve, reject) => {
      this.api.get("users/show", { screen_name: h }, (error, data) => {
        if (data) {
          resolve(data);
        } else if (error) {
          reject(error);
        }
      });
    });
    return p;
  }

  async TwitterByUsername(username) {
    const response = await this.get(`${username}/?__a=1`);
    return response;
  }
}

module.exports = TwitterAPI;

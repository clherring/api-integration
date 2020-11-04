const { RESTDataSource } = require("apollo-datasource-rest");
const dotenv = require("dotenv");
// set environment variables from ../.env
dotenv.config();

class TmdbApi extends RESTDataSource {
  willSendRequest(request) {
    request.params.set("apikey", process.env.TMDB_API_KEY);
  }

  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/";
  }

  async TMDBPersonById(id) {
    const response = await this.get(
      `person/${id}?api_key=${process.env.TMDB_API_KEY}`
    );

    return response;
  }

  async TMDBSocialById(id) {
    const response = await this.get(
      `person/${id}/external_ids?api_key=${process.env.TMDB_API_KEY}`
    );

    return response;
  }

  async TMDBPersonByName(name) {
    const response = await this.get(
      `search/person?api_key=${
        process.env.TMDB_API_KEY
      }&query=${encodeURIComponent(name)}`
    );

    return response;
  }
  async TMDBGetCreditsById(id) {
    const response = await this.get(
      `person/${id}/combined_credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );

    return response;
  }
}

module.exports = TmdbApi;

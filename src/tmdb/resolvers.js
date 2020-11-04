const _ = require("lodash/fp");

const tmdb = {
  Query: {
    TMDBSearchTalent: async (parent, args, { dataSources }) => {
      const results = await dataSources.tmdbAPI.TMDBPersonByName(args.name);
      const response = _.flow([
        _.getOr([], "results"),
        _.map((result) => ({
          tmdbID: result.id,
          thumbnail: `https://image.tmdb.org/t/p/w200${result.profile_path}`,
          name: result.name,
        })),
      ])(results);

      return response;
    },
    TMDBTalentByID: async (parent, args, { dataSources }) => {
      const res = await dataSources.tmdbAPI.TMDBPersonById(args.tmdbID);
      const social = await dataSources.tmdbAPI.TMDBSocialById(args.tmdbID);
      return {
        tmdbID: res.id,
        name: res.name,
        birthday: res.birthday,
        biography: res.biography,
        place_of_birth: res.place_of_birth,
        known_for_department: res.known_for_department,
        thumbnail: `https://image.tmdb.org/t/p/w200${res.profile_path}`,
        twitter: social.twitter_id,
        facebook: social.facebook_id,
        instagram: social.instagram_id,
      };
    },
    TMDBCreditsByID: async (parent, args, { dataSources }) => {
      const res = await dataSources.tmdbAPI.TMDBGetCreditsById(args.tmdbID);
      const fetch = res.cast;
      const response = [];
      for (let i = 0; i < fetch.length; i++) {
        const result = fetch[i];
        response.push({
          id: result.id,
          title: result.title || "",
          character: result.character,
          release_date: result.release_date || "",
          thumbnail: `https://image.tmdb.org/t/p/w200${result.poster_path}`,
        });
      }
      return response;
    },
  },
};

module.exports = tmdb;

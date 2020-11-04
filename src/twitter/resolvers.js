const twitterResolver = {
  Query: {
    TwitterByUsername: async (parent, args, { dataSources }) => {
      const { username } = args;
      const res = await dataSources.twitterAPI.followerCount(username);
      return {
        username,
        followerCount: res.followers_count,
      };
    },
  },
};

module.exports = twitterResolver;

const site = require("../../_data/site");

module.exports = {
  eleventyComputed: {
    metadata: {
      url: () => `${site.url}/blog/`,
      author: {
        name: site.authorName,
      },
    },
  },
};

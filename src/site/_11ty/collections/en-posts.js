module.exports = (collectionApi) =>
  collectionApi
    .getFilteredByGlob(["./src/site/content/en/posts/**/*.md"])
    .sort((a, b) => b.date - a.date);

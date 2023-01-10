module.exports = (collectionApi) =>
  collectionApi
    .getFilteredByGlob(["./src/site/content/posts/**/*.md"])
    .sort((a, b) => b.date - a.date);

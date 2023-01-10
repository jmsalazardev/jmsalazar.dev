module.exports = (collectionApi) => {
  const tags = new Set();
  collectionApi
    .getFilteredByGlob("./src/site/content/posts/**/*.md")
    .map((item) => {
      if (item.data.tags) {
        item.data.tags.map((tag) => tags.add(tag));
      }
    });

  return [...tags].sort();
};

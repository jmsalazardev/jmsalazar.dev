module.exports = (collection) => (collection.getFilteredByGlob("./src/en/posts/*.md").reverse());

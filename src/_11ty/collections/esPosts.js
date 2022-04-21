module.exports = (collection) => (collection.getFilteredByGlob("./src/es/posts/*.md").reverse());

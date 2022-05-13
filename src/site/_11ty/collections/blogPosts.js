const { isLive } = require('../filters/is-live');

module.exports = (collectionApi) => {
  const tag = 'blog';
  return collectionApi.getFilteredByTag(tag).filter(isLive).reverse();
};
const { isLive } = require('../filters/is-live');

module.exports = (collectionApi) => {
  const tag = 'projects';
  return collectionApi.getFilteredByTag(tag).filter(isLive).reverse();
};
const get = require('lodash.get');

const cache = {};

module.exports = (key, locale) => {
  const { lang } = locale || {} ;
  const selectedLang = lang || 'es';
  const parts = key.split('.');
  const namespace = parts.length > 1 ? parts[0] : 'common';
  
  if (parts.length > 1) parts.shift();

  const newKey = parts.length > 0 ? parts.join('.') : key;
    
  const basepath = `../../_data/locales/${selectedLang}`;
  const filename = `${basepath}/${namespace}.json`;
  if (!cache[filename]) {
    try {
      cache[filename] = require(filename);
    } catch (error) {
      throw new Error(`filename '${filename}' does not exists`);
    }
  }

  const value = get(cache[filename], newKey ) || key;
  return value;
};

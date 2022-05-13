const get = require('lodash.get');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const cache = {};

module.exports = (key, locale) => {
  if (!key) return;
  const { lang } = locale || {} ;
  const selectedLang = lang || 'es';
  const parts = key.split('.');
  const namespace = parts.length > 1 ? parts[0] : 'common';
  
  if (parts.length > 1) parts.shift();

  const newKey = parts.length > 0 ? parts.join('.') : key;
  // const basepath = path.join(__dirname, '..', '..', '_data', 'locales', selectedLang);
  const basepath = path.join('src', 'locales', selectedLang);
  const filename = `${basepath}/${namespace}.yml`;

  if (!cache[filename]) {
    if (!fs.existsSync(filename)) throw new Error(`filename '${filename}' does not exists`);
    const file = fs.readFileSync(filename, 'utf8');
    cache[filename] = YAML.parse(file);
  }

  const value = get(cache[filename], newKey ) || key;
  return value;
};

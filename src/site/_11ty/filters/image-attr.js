const imageAttrs = require("./image-attrs");

module.exports = (value, attr) => {
  if (!value) return "";
  const attrs = imageAttrs(value);
  if (attr in attrs) {
    return attrs[attr];
  }

  return "";
};

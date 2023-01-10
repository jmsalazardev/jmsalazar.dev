const countries = require("../../_data/countries.json");

module.exports = (countryCode, attr) => {
  if (!countryCode) return "";
  const country = countries.find((country) => country.code === countryCode);
  if (country) {
    return country[attr];
  }
  return "";
};

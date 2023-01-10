module.exports = (value) => {
  if (!value) return "";
  const [, subtitle] = value.split("-");
  if (subtitle) return subtitle.trim();
  return "";
};

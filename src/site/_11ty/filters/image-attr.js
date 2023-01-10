module.exports = (value, attr) => {
  if (!value) return "";
  const [, hash] = value.split("#");
  const params = hash.split("&").map((entry) => {
    const [key, value] = entry.split("=");
    return { key, value };
  });

  const param = params.find((entry) => entry.key === attr);
  if (param) {
    return param.value;
  }

  return "";
};

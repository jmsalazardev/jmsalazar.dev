module.exports = (data) => {
  const parts = data.page.url.split("/");
  parts.shift();
  parts.pop();

  const key = parts.join("-");
  parts.pop();
  const parent = parts.length > 0 ? parts.join("-") : null;

  return {
    key,
    parent,
    url: data.page.url,
    pluginType: "eleventy-navigation",
    _isBreadcrumb: true,
  };
};

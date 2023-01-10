const { env } = require("../../_data/site");
const htmlmin = require("html-minifier");

module.exports = (content, outputPath) => {
  if (!(env === "production" && outputPath.endsWith(".html"))) return content;

  return htmlmin.minify(content, {
    collapseWhitespace: true,
    removeComments: true,
    useShortDoctype: true,
  });
};

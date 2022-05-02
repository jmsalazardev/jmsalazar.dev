
const htmlmin = require("html-minifier");

module.exports = (content, outputPath) => {
    if (process.env.NODE_ENV !== "production" && !outputPath.endsWith(".html") ) return content;
    
    return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
    });
};

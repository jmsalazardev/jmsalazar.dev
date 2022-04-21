// https://jec.fyi/blog/setting-up-seo-and-google-analytics

const sass = require("sass");
const fs = require("fs");
const CleanCSS = require("clean-css");
const svgContents = require("eleventy-plugin-svg-contents");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const pluginPWA = require("11ty-plugin-pwa");
const pluginSEO = require("eleventy-plugin-seo");
const pluginManifest = require("@navillus/eleventy-plugin-manifest");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const compressor = require("node-minify");
const dedent = require("dedent");
const metadata = require("./src/_data/metadata.json");
const site = require("./src/_data/site");

const youtubeShortcode = require('./src/_11ty/shortcodes/youtube');

const tagsCollection = require('./src/_11ty/collections/tags');
const enPostsCollection = require('./src/_11ty/collections/enPosts');
const esPostsCollection = require('./src/_11ty/collections/esPosts')

const cssCleaner = new CleanCSS({});
const cssMap = {};
const jsMap = {};

const imageTransform = require("./src/_transforms/image.transform");
const readableDateFilter = require("./src/_11ty/filters/readable-date");
const htmlDateStringFilter = require("./src/_11ty/filters/html-date-string");
const headingFilter = require("./src/_11ty/filters/heading");
const shortTitleFilter = require("./src/_11ty/filters/short-title");
const subtitleFilter = require("./src/_11ty/filters/subtitle");
const i18nFilter = require("./src/_11ty/filters/i18n");
const { ELEVENTY_APP_ENV } = process.env;

const isProduction = ELEVENTY_APP_ENV === 'production';

const compileJS = async (tmplClass) => new Promise((resolve, reject) => {
  compressor.minify({
    compressor: 'gcc',
    input: [`assets/js/${tmplClass}.js`],
    output: '/dev/null',
    callback: (err, min) => {
      if (err) return reject(err);
      jsMap[tmplClass] = min;
      resolve(tmplClass);
    },
  });
});

const compileSass = async (tmplClass) => new Promise((resolve) => {
  const result = sass.compile(`src/design/${tmplClass}.scss`,{
    sourceMap: false,
    outputStyle: 'compressed',
  });

  const css = cssCleaner.minify(result.css.toString());
  cssMap[tmplClass] = css.styles;
  resolve(tmplClass);
});

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("src");

  
  eleventyConfig.on("beforeBuild", async () => {
    await Promise.all([
      compileJS("main"),
      compileSass("main"),
      compileSass("simple"),
      compileSass("home"),
      compileSass("tags"),
      compileSass("posts"),
      compileSass("post"),
    ]).then((values) => {
      console.log(values);
    });
  });
  

  //#region Plugins


  eleventyConfig.addPlugin(pluginManifest, site.manifest);

  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./public/sw.js",
    globDirectory: "./public",
    
  });
 
  eleventyConfig.addPlugin(pluginSEO, {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    author: metadata.author.name,
    twitter: metadata.social.twitter.id,
    image:
      "https://lh3.googleusercontent.com/bLprK4Iq9bJiCDs7f9d6o69yKNB8m3tqhlCUbq4xXKM88W7-xfik7f0SA8UhUzkICCL12iUZ9JqRE0pn7LY",
  });

  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(svgContents);

  //#endregion

  //#region Transforms

  eleventyConfig.addTransform("imagesResponsiver", imageTransform);

  //#endregion

  //#region Filters
  eleventyConfig.addFilter("i18n", i18nFilter);
  

  eleventyConfig.addFilter("cssmin", function (code) {
    return cssCleaner.minify(code).styles;
  });

  eleventyConfig.addFilter("toString", function (value) {
    return JSON.stringify(value);
  });

  eleventyConfig.addFilter("inlineCSS", (tmplClass) => {
    return cssMap[tmplClass] ?? "";
  });

  eleventyConfig.addFilter("inlineJS", (tmplClass) => {
    return jsMap[tmplClass] ?? jsMap["main"];
  });

  eleventyConfig.addFilter("htmlDateString", htmlDateStringFilter);

  eleventyConfig.addFilter("heading", headingFilter);

  eleventyConfig.addFilter("readableDate", readableDateFilter);

  eleventyConfig.addFilter("shortTitle", shortTitleFilter);

  eleventyConfig.addFilter("subtitle", subtitleFilter);
  
  //#endregion

  //#region PassthroughCopy
  eleventyConfig.addPassthroughCopy({
    // "assets/icon": ".",
  });
  eleventyConfig.addPassthroughCopy({
    "assets/.well-known": ".well-known",
  });

  //#endregion

  //#region Shortcode
  

  eleventyConfig.addShortcode("youtube", youtubeShortcode);

  
  //#endregion


  eleventyConfig.addLayoutAlias("tag", "layouts/tag.njk");

  /* Markdown Overrides */

  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    placement: "after",
    class: "direct-link",
    symbol: "#",
    level: [1,2,3,4],
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addCollection("tags", tagsCollection);

  eleventyConfig.addCollection("posts_en", enPostsCollection);

  eleventyConfig.addCollection("posts_es", esPostsCollection);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("public/404.html");

        browserSync.addMiddleware("*", (req, res) => {

          if (req.url === '/') {
            res.writeHead(302, {
              location: '/es/'
            });
            return res.end();
          }
          
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
    https: true,
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    pathPrefix: "/",

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_layouts"
    },
  };
};

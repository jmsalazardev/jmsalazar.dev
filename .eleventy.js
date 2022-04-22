const sass = require("sass");
const fs = require("fs");
const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const pluginPWA = require("11ty-plugin-pwa");
const pluginSEO = require("eleventy-plugin-seo");
const pluginManifest = require("@navillus/eleventy-plugin-manifest");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const compressor = require("node-minify");
const metadata = require("./src/_data/metadata.json");
const site = require("./src/_data/site");

const cssCleaner = new CleanCSS({});
const cssMap = {};
const jsMap = {};

const collections = {
  enPosts: require('./src/_11ty/collections/enPosts'),
  esPosts: require('./src/_11ty/collections/esPosts'),
  tags: require('./src/_11ty/collections/tags')
};

const filters = {
  heading: require('./src/_11ty/filters/heading'),
  htmlDateString: require('./src/_11ty/filters/html-date-string'),
  i18n: require('./src/_11ty/filters/i18n'),
  readableDate: require('./src/_11ty/filters/readable-date'),
  shortTitle: require('./src/_11ty/filters/short-title'),
  subtitle: require('./src/_11ty/filters/subtitle'),
  cssmin: (code) => (cssCleaner.minify(code).styles),
  toString: (value) => (JSON.stringify(value)),
  inlineCSS: (tmplClass) => (cssMap[tmplClass] ?? ''),
  inlineJS: (tmplClass) => (jsMap[tmplClass] ?? jsMap["main"])
};

const shortcodes = {
  youtube: require('./src/_11ty/shortcodes/youtube')
};

const transforms = {
  imagesResponsiver: require("./src/_11ty/transforms/image")
};


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

  //#endregion


  eleventyConfig.addPassthroughCopy({
    "assets/.well-known": ".well-known",
  });

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

  for (let [key, collection] of Object.entries(collections)) {
    eleventyConfig.addCollection(key, collection);
  }

  for (let [key, shortcode] of Object.entries(shortcodes)) {
    eleventyConfig.addShortcode(key, shortcode);
  }

  for (let [key, filter] of Object.entries(filters)) {
    eleventyConfig.addFilter(key, filter);
  }

  for (let [key, transform] of Object.entries(transforms)) {
    eleventyConfig.addTransform(key, transform);
  }
  
  
  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, browserSync) => {
        const content_404 = fs.readFileSync("public/404.html");
        browserSync.addMiddleware("*", (req, res) => { 
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
      includes: "_includes"
    },
  };
};

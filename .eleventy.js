const { minify } = require("terser");
const fs = require("fs");
const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const svgContents = require("eleventy-plugin-svg-contents");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const pluginPWA = require("11ty-plugin-pwa");
const pluginSEO = require("eleventy-plugin-seo");
const pluginManifest = require("@navillus/eleventy-plugin-manifest");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const metadata = require("./src/_data/metadata.json");
const site = require("./src/_data/site");

const string = require('string');
const slugify = s => string(s).slugify().toString();

const cssCleaner = new CleanCSS({});

const collections = {
  enPosts: require('./src/_11ty/collections/enPosts'),
  esPosts: require('./src/_11ty/collections/esPosts'),
  esTags: require('./src/_11ty/collections/esTags'),
  enTags: require('./src/_11ty/collections/enTags'),
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
  btoa: (value) => (btoa(value)),
  // inlineCSS: (tmplClass) => (cssMap[tmplClass] ?? ''),
  // inlineJS: (tmplClass) => (jsMap[tmplClass] ?? jsMap["main"])
};




const shortcodes = {
  youtube: require('./src/_11ty/shortcodes/youtube')
};

const transforms = {
  imagesResponsiver: require("./src/_11ty/transforms/image"),
  htmlMinifier: require("./src/_11ty/transforms/html-minifier")
};

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("src");

  //#region Plugins

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async (
    code,
    callback
  ) => {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });


  // eleventyConfig.addPlugin(pluginCSS);

  eleventyConfig.addPlugin(svgContents);

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
      "https://lh3.googleusercontent.com/osTamtgO__DkIWracciFvvSCcsIKwyBRtEVBGFZZ1luYgOTfeIK1oXg4_svyI_kTAv1qlxIneHweyfeZK3zhTabpbVn7LsIc3n0vI7FEykrw42zxNR5LP3v2ALg9vG-Iz87YeNp7aMZVHiYh5nBsaq-hflrXE2-CjROXk8x8gOFkzR68bYCtpKyIBQtTu-LRzcHwnR_4ow2ES1KeBrGpG0Gs1FmsshGjPU8AvDaH-ni0Jh0WlYz44ZoL2DX8ILApYqs_wSIAefFkp1v6iV5FnD5ApHUk4fY6qpjLuuEjVZxHGRvjFSYDRs5wnLkpFWRCCc7BatlqE0oGOGZyo6Ui3huzP66kjNekAwV5X_F9YkVh-lCT4xl54o7NDeV8lcCQxz7Guah1pK8gvOSzsnlEZOopvuss8euumlEg9nbg1VLMUAdrp-7WYotaKgdPrlmzIrekVDbcsBD7i7iPb9irq-JIz0zNhAOuBmdrDV9kPYdPTvRpTMMZQyoA8O8Vsrqkx84yucKalv8DhMibStJwQ7KGHQWohfRK5k0dv5IHNMGDxs_79oLdRMkkMNRpskobNkoCK-hXTGlswJ-ofVe1PlqSswvw5cpNJPxBb2BTC0P_R4dO6z0eizuLeJ4X2zdIAnBI4cwq11-0RaEXp_m_NOL2Swvz_HoN6zrbbQKAlVna04-N9KD0P5nnjWMdWW885SAm1JhbOeu5pAfzH2b9mhllvexgGOFP3MbxMeccDZMkFtb-EWudT4SFuMZGy7Og0B0DS_Cw0Wbybg7R1Ye0KKxuVOaKUdh7Q01p",
  });

  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  //#endregion

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addPassthroughCopy({
    'src/_assets/.well-known': '.well-known',
  });

  eleventyConfig.addLayoutAlias("tag", "layouts/tag.njk");

  /* Markdown Overrides */

  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    slugify,
    placement: "after",
    class: "direct-link",
    symbol: "#",
    level: [1, 2, 3, 4],
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

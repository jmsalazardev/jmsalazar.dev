const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const pluginPWA = require("11ty-plugin-pwa");
const pluginSEO = require("eleventy-plugin-seo");
const pluginManifest = require("@navillus/eleventy-plugin-manifest");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const metadata = require("./src/site/_data/metadata.json");
const site = require("./src/site/_data/site");
const slugify = require("./src/site/_11ty/filters/slugify");
const cssCleaner = new CleanCSS({});
const _11ty = "./src/site/_11ty";

const collections = {
  enposts: require(`${_11ty}/collections/en-posts`), 
  posts: require(`${_11ty}/collections/posts`), 
  tags: require(`${_11ty}/collections/tags`),
  enTags: require(`${_11ty}/collections/en-tags`),
};

const filters = {
  imageAttr: require(`${_11ty}/filters/image-attr`),
  countryAttr: require(`${_11ty}/filters/country-attr`),
  include: require(`${_11ty}/filters/include`),
  svgContents: require(`${_11ty}/filters/svg-contents`),
  heading: require(`${_11ty}/filters/heading`),
  htmlDateString: require(`${_11ty}/filters/html-date-string`),
  i18n: require(`${_11ty}/filters/i18n`),
  readableDate: require(`${_11ty}/filters/readable-date`),
  shortTitle: require(`${_11ty}/filters/short-title`),
  subtitle: require(`${_11ty}/filters/subtitle`),
  cssmin: (code) => cssCleaner.minify(code).styles,
  toString: (value) => JSON.stringify(value),
  btoa: (value) => btoa(value),
};

const shortcodes = {
  player: require(`${_11ty}/shortcodes/player`),
  gmaps: require(`${_11ty}/shortcodes/gmaps`),
  gallery: require(`${_11ty}/shortcodes/gallery`),
};

const transforms = {
  imagesResponsiver: require(`${_11ty}/transforms/image`),
  iframe: require(`${_11ty}/transforms/iframe`),
  htmlMinifier: require(`${_11ty}/transforms/html-minifier`),
};

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("src");
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginManifest, site.manifest);

  if (site.env === "production") {
    eleventyConfig.addPlugin(pluginPWA, {
      swDest: "./public/sw.js",
      globDirectory: "./public",
    });
  }

  eleventyConfig.addPlugin(pluginSEO, {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    author: metadata.author.name,
    twitter: metadata.social.twitter.id,
    image:
      "https://lh3.googleusercontent.com/euZKxI5v6uBky_rleIxupCGijZWsbT3QZIy8eQXyJiQwiCUEjiEBZTpg15zMyQaxXIZ5SkX1OXgfxU9NzrcrIr2IvjPNvX5GzzIJr4FrPmAd2AGcLgZum0rZjLU-5VNEjWrXhOKxSw=w500-h281-n-rw",
    options: {
      titleDivider: "|",
    },
  });

  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  //#endregion

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addPassthroughCopy({
    "src/static": ".",
    "public/en/index.html": "localized/en_ALL/index.html",
    "public/index.html": "localized/es_ALL/index.html",
  });

  // eleventyConfig.addLayoutAlias("tag", "layouts/tag.njk");

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

  eleventyConfig.on("eleventy.after", async () => {
    const langs = ["en"];
    for (const lang of langs) {
      await fs.promises.mkdir(`public/localized/${lang}_ALL/`, {
        recursive: true,
      });
      await fs.promises.copyFile(
        `public/${lang}/index.html`,
        `public/localized/${lang}_ALL/index.html`
      );
      await fs.promises.copyFile(
        `public/${lang}/404.html`,
        `public/localized/${lang}_ALL/404.html`
      );
    }
  });

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, browserSync) => {
        browserSync.addMiddleware("*", (req, res) => {
          const [, lang] = (req.url || "/en/").split("/");

          const content_404 = fs.readFileSync(`public/${lang}/404.html`);

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
    templateFormats: ["md", "njk", "html", "liquid"],

    pathPrefix: "/",

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: "src/site/content",
      output: "public",
      data: "../_data",
      includes: "../_includes",
    },
  };
};

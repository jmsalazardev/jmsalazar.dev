const baseUrl = "https://jmsalazar.dev";
const helpers = require("./helpers");
const authors = require("./authors.json");
const manifest = {
  output: "public",
  name: "JMSalazarDev",
  short_name: "JMSalazarDev",
  start_url: "/",
  background_color: "#272b30",
  theme_color: "#12181b",
  display: "standalone",
  orientation: "portrait",
  description: "Un blog de un desarrollador de software",
  icon: "src/images/favicon.png",
  icons: [...helpers.appleIcons(), ...helpers.maskableIcons()],
};

const author = authors.jmsalazardev;

const ads = {
  type: "adsense",
  "data-ad-client": "ca-pub-3653368526664916",
};

const analytics = {
  type: "googleanalytics",
  config: "https://jmsalazar.dev/analytics.account.config.json",
};

module.exports = {
  env: process.env.ELEVENTY_ENV || "dev",
  buildTime: new Date(),
  name: manifest.name,
  url: baseUrl,
  authorName: author.name,
  authorUrl: "https://twitter.com/jmsalazardev",
  description: manifest.description,
  manifest,
  metadata: [
    {
      charset: "utf-8",
    },
    {
      "http-equiv": "x-ua-compatible",
      content: "ie=edge",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "google-site-verification",
      content: "o62qymacwFHda3VDv6spKazWaHsP3FhHbVuweoBHxAk",
    },
    {
      name: "theme-color",
      content: manifest.theme_color,
    },
    {
      property: "fb:app_id",
      content: "853083879289283",
    },
    {
      name: "generator",
      content: "Eleventy",
    },
  ],
  links: [
    {
      href: "https://github.com/jmsalazardev",
      rel: "me",
    },
    {
      rel: "me",
      href: "https://twitter.com/jmsalazardev",
    },
    {
      rel: "me",
      href: "mailto:admin@jmsalazar.dev",
    },
    {
      rel: "webmention",
      href: "https://webmention.io/jmsalazar.dev/webmention",
    },
    {
      rel: "pingback",
      href: "https://webmention.io/jmsalazar.dev/xmlrpc",
    },
    {
      rel: "authorization_endpoint",
      href: "https://indieauth.com/auth",
    },
    {
      rel: "token_endpoint",
      href: "https://tokens.indieauth.com/token",
    },
  ],
  ads,
  analytics,
};

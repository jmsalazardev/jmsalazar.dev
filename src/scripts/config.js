module.exports = {
  gtag: {
    hosts: ["jmsalazar.dev"],
    attrs: {
      src: "https://www.googletagmanager.com/gtag/js?id=310458696",
      async: true,
    },
    delay: 3500,
    ids: ["310458696"],
  },
  ads: {
    hosts: ["jmsalazar.dev"],
    delay: 3500,
    attrs: {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      "data-ad-client": "ca-pub-3653368526664916",
      async: true,
    },
  },
  comments: {
    src: "https://jmsalazardev.disqus.com/embed.js",
  },
};

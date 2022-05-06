const baseUrl = 'https://jmsalazar.dev';
const helpers = require('./helpers');

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
  icon: "src/_assets/img/favicon.png",
  icons: [...helpers.appleIcons(), ...helpers.maskableIcons()]
};

module.exports = {
  buildTime: new Date(),
  name: "JMSalazar.dev",
  url: baseUrl,
  authorName: "José Miguel Salazar",
  authorUrl: "https://twitter.com/JMSalazarDev",
  description: "Un blog de desarrollo de software.",
  favicon: `${baseUrl}/favicon.ico`,
  gtag: {
    src: 'https://www.googletagmanager.com/gtag/js?id={id}',
    hosts: ['jmsalazar.dev', '10.192.0.108'],
    configs: ['G-KH7TX6T3E9'],
    delay: 1000,
  },
  comments: {
    // disqus:
    //  src: "https://jmsalazardev.disqus.com/embed.js",
    //    
    // utterances: 
    repo: "jmsalazardev/comments",
    theme: "github-light",
    'issue-term': '{url}',
    src: "https://utteranc.es/client.js",
    crossorigin: 'anonymous',
    async: true,
  },

  manifest
};
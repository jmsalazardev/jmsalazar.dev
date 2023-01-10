const slugify = require("../../_11ty/filters/slugify");
const metadata = require("../../_data/metadata.json");

const section = "posts";
const category = "article";

module.exports = {
  layout: "post",
  eleventyComputed: {
    canonical: (data) => `${metadata.url}/posts/${data.slug}/`,
    slug: (data) => data.slug || slugify(data.title),
    permalink: (data) => `/${section}/${data.slug}/`,
    alternate: (data) => [
      ...data.alternate,
      { rel: "amphtml", href: `${metadata.url}/amp${data.permalink}` },
    ],
    eleventyNavigation: {
      key: (data) => `${data.slug}`,
      parent: (data) => `${data.locale.lang}-${section}`,
    },
    category,
  },
};

const merge = require("lodash.merge");

module.exports = (options) => {
  const { section, locale } = options;
  if (!section) throw new Error("section is not defined");

  const lang = !locale || locale.default === true ? "" : `/${locale.lang}`;
  return merge(
    {
      layout: "posts",
      section,
      permalink: `${lang}/{{ section }}/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}`,
      date: new Date(),
      tags: [],
      pagination: {
        data: "collections.posts",
        size: 120,
        alias: "posts",
        before: (paginationData) =>
          paginationData
            .filter((entry) => entry.data.category === section)
            .sort((a, b) => a.data.slug.localeCompare(b.data.slug)),
      },
    },
    options
  );
};

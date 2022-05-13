const string = require('string');
const slugify = s => string(s).slugify().toString();

module.exports = {
  layout: 'post',
  section: 'blog',
  type: 'article',
  eleventyComputed: {
    slug: data =>  data.slug || slugify(data.title),
    permalink: data => `${data.locale.lang}/${data.section}/${data.slug}/`,

    eleventyNavigation: {
      key: data => data.slug,
      parent: data => `${data.locale.lang}-${data.section}`,
    }
  }

};

  

const slugify = require("../_11ty/filters/slugify");
const imageAttrs = require("../_11ty/filters/image-attrs");
const authors = require("../_data/authors.json");

module.exports = {
  currentYear() {
    const today = new Date();
    return today.getFullYear();
  },
  maskableIcons() {
    const icons = [48, 72, 96, 128, 192, 384, 512].map((size) => ({
      src: `maskable_icon_x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    }));

    icons.push({
      src: "maskable_icon.png",
      sizes: "196x196",
      type: "image/png",
      purpose: "maskable",
    });
    return icons;
  },
  appleIcons() {
    return [57, 72, 76, 114, 120, 144, 152, 180].map((size) => ({
      src: `apple-touch-icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    }));
  },
  imageParser: (image) => imageAttrs(image),
  getTagUrl: (tag, locale) => {
    const prefix = locale.default ? "" : `/${locale.lang}`;
    return `${prefix}/tags/${slugify(tag)}/`;
  },
  getAuthor: (author) => {
    if (author in authors) return authors[author];

    for (const [, value] of Object.entries(authors)) {
      if (value.default) {
        return value;
      }
    }

    return null;
  },
};

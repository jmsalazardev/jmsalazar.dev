const dedent = require("dedent");

module.exports = (attrs) => {
  const { provider, id } = attrs;

  const title = attrs.name || "Ver video";
  const allow =
    attrs.allow ||
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  let src = attrs.src || null;

  if (provider === "youtube") {
    src = `https://www.youtube.com/embed/${id}`;
  }

  if (!src) throw new Error("Video src is required");

  return dedent`<iframe src="${src}" class="w-full aspect-video" title="${title}" frameborder="0" allow="${allow}" allowfullscreen></iframe>`;
};

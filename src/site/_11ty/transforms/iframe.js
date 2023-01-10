const cheerio = require("cheerio");

let $;
let ampIframe = false;
let ampYoutube = false;
const youtubeRE = /https:\/\/www\.youtube\.com\/embed\/(.*)/;

function iframeAmpMap() {
  const src = $(this).attr("src");

  const matchYoutube = youtubeRE.exec(src);

  if (matchYoutube) {
    const [, youtubeId] = matchYoutube;
    ampYoutube = true;
    this.tagName = "amp-youtube";

    $(this)
      .removeAttr("src")
      .removeAttr("title")
      .removeAttr("frameborder")
      .removeAttr("allow")
      .removeAttr("allowfullscreen")
      .attr("height", "270")
      .attr("width", "480")
      .attr("layout", "responsive")
      .attr("data-videoid", youtubeId);
  } else {
    ampIframe = true;
    this.tagName = "amp-iframe";
    $(this)
      .attr("height", "100")
      .attr("width", "200")
      .attr("sandbox", "allow-scripts allow-same-origin")
      .attr("frameborder", "0")
      .attr("src", src)
      .attr("layout", "responsive");
  }
}

function iframeMap() {
  const src = $(this).attr("src");

  $(this)
    .removeAttr("src")
    .attr("x-data", "iframe")
    .attr("x-ref", "iframe")
    .attr("x-intersect.once", "load")
    .attr("x-init", `src='${src}';`);
}

module.exports = (content, outputPath) => {
  if (!outputPath.endsWith(".html")) return content;

  $ = cheerio.load(content);
  if (outputPath.startsWith("public/amp/")) {
    $("iframe").each(iframeAmpMap);
  } else {
    $("iframe").each(iframeMap);
  }

  if (ampYoutube) {
    $("head").append(
      '<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>'
    );
  }

  if (ampIframe) {
    $("head").append(
      '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>'
    );
  }

  return $.html();
};

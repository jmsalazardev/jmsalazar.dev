const cheerio = require("cheerio");
const imageAttrs = require("../filters/image-attrs");

module.exports = (content, outputPath) => {
  if (!outputPath.endsWith(".html")) return content;

  const $ = cheerio.load(content);
  $("img").each(function () {
    const imageSrc = $(this).attr("src");
    const parsedSrc = imageAttrs(imageSrc);
    if (!parsedSrc) {
      return;
    }

    const { width, height, src, className } = parsedSrc;

    if (outputPath.startsWith("public/amp/")) {
      this.tagName = "amp-img";
      $(this)
        .attr("width", width)
        .attr("height", height)
        .attr("src", src)
        .attr("layout", "responsive");
    } else {
      const empty = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20${width}%20${height}'%3E%3C/svg%3E`;
      $(this)
        .attr("x-data", "image")
        .attr("x-ref", "image")
        .attr("x-intersect.once", "load")
        .attr("x-init", `width=${width};height=${height}; src='${src}';`)
        .attr("width", width)
        .attr("height", height)
        .attr("src", empty);

      if (className) {
        const items = className.split(",");
        const classAttr = $(this).attr("class") || "";
        const classList = classAttr === "" ? [] : classAttr.split(" ");

        const newItems = items.filter((item) => !classList.includes(item));
        classList.push(...newItems);
        $(this).attr("class", classList.join(" "));
      }
    }
  });

  return $.html();
};

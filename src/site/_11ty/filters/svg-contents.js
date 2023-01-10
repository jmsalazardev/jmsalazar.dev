const fs = require("fs");
const path = require("path");
const { createSVGWindow } = require("svgdom");
const window = createSVGWindow();
const document = window.document;

const fileContent = {};

module.exports = function (file, classAttr) {
  let relativeFilePath = `.${file}`;
  if (path.extname(file) != ".svg") {
    throw new Error("svg-contents requires a filetype of svg");
  }

  const wrapper = document.createElement("div");
  if (!fileContent[relativeFilePath]) {
    fileContent[relativeFilePath] = fs.readFileSync(
      relativeFilePath,
      (err, contents) => {
        if (err) throw new Error(err);
        return contents;
      }
    );
  }

  wrapper.innerHTML = fileContent[relativeFilePath];

  const svg = wrapper.firstChild;

  const classList = new Set();
  `${svg.getAttribute("class") || ""} ${classAttr || ""}`
    .split(" ")
    .forEach((item) => classList.add(item));

  svg.setAttribute(
    "class",
    [...classList].filter((item) => item !== "").join(" ")
  );

  return wrapper.innerHTML;
};

const fs = require("fs");
const fileContent = {};

module.exports = function (file) {
  const relativeFilePath = `.${file}`;
  if (!fileContent[relativeFilePath]) {
    fileContent[relativeFilePath] = fs.readFileSync(
      relativeFilePath,
      (err, contents) => {
        if (err) throw new Error(err);
        return contents;
      }
    );
  }

  return fileContent[relativeFilePath];
};

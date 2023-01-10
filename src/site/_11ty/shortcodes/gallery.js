const dedent = require("dedent");

module.exports = (images) =>
  dedent(`
    <div class="grid grid-cols-4 gap-4 not-prose">${images
      .map(
        (image) => `
        <div>
            <a href="${image.src}" rel="noopener" target="_blank" title="${image.title}">
                <img alt="${image.alt}" src="${image.src}#width=100&height=100" class="rounded-md" />
            </a>
        </div>`
      )
      .join(" ")}
    </div>`);

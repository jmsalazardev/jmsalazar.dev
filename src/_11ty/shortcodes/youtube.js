const dedent = require("dedent");

module.exports = (id, allow) => (dedent`<div class="frame"><iframe data-src="https://www.youtube.com/embed/${id}" title="Ver Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`)

const dedent = require("dedent");

// module.exports = ({address, city, country, latitude, longitude, zoom}) => (dedent`<p>${address}<br />${city}, ${country}</p><iframe x-data="iframe" x-ref="iframe" class="w-full aspect-square" x-intersect.once="load" x-init="src='https://www.google.com/maps/d/u/0/embed?mid=1_267kEG2rtvG_3vTysxt8lhMyw-F3Vir&ll=${latitude},${longitude}&z=${zoom}&output=embed';"></iframe>`);
module.exports = ({ address, city, country, latitude, longitude, zoom }) =>
  dedent`<p>${address}<br />${city}, ${country}</p><iframe class="w-full aspect-square" src="https://www.google.com/maps/d/u/0/embed?mid=1_267kEG2rtvG_3vTysxt8lhMyw-F3Vir&ll=${latitude},${longitude}&z=${zoom}&output=embed"></iframe>`;

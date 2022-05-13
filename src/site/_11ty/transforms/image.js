const queryString = require("query-string");
const cheerio = require('cheerio');



module.exports = (content, outputPath) => {
  if (!outputPath.endsWith(".html")) {
    return content;
  }

  const $ = cheerio.load(content);
  $('img').each(function () {
    const src = $(this).attr('src');
    if(src === '') return;
    let url;
    try {
      url = new URL(src);  
    } catch (error) {
      console.log(src, error)
      return;
    }
    
    if (url.hostname === 'lh3.googleusercontent.com') {
      const { origin, pathname, search, hash } = url;
      
      const parsed = queryString.parse(hash.slice(1), {parseNumbers: true, parseBooleans: true});
      
      const {width, height, className, crop } = parsed;

      const empty = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20${width}%20${height}'%3E%3C/svg%3E`;

      const newSrc = `${origin}${pathname}${search}`;
      $(this)
        .attr('x-data', 'image')
        .attr('x-ref', 'image')
        .attr('x-intersect.once', 'load')
        .attr('x-init', `width=${width};height=${height}; src='${newSrc}';`)
        .attr('width', width)
        .attr('height', height)
        .attr('src', empty);
        
        if(className) {
          const items = className.split(',');
          const classAttr = $(this).attr('class') || '';
          const classList = classAttr === '' ? [] : classAttr.split(' ');

          const newItems = items.filter(item => !classList.includes(item));
          classList.push(...newItems);
          $(this).attr('class', classList.join(' '));
          
        }
    }

  })
  
  return $.html();

};

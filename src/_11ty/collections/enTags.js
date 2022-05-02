const string = require("string");

module.exports = (collection) => {
    const posts = collection.getFilteredByGlob("./src/en/posts/*.md");
    
    let tagSet = new Set();
    posts.forEach((item) => {
        if ('tags' in item.data) {
            let tags = item.data.tags;

            tags = tags.filter(item => ![
                'all',
                'nav',
                'post',
            ].includes(item));
            
            for (const tag of tags) {
                tagSet.add(string(tag).slugify().toString());
            }
        }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet].sort();
};

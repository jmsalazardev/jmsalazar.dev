const string = require("string");

// module.exports = (collection) => (collection.getFilteredByGlob("./src/es/posts/*.md").reverse());

module.exports = (collectionApi) => {
    const tags = {};
    collectionApi.getAll().map(item => {
        if (item.data.tags) { // handle pages that don't have tags
            const {locale:{ lang }} = item.data;
            
            if (!tags[lang]) tags[lang] = new Set();
            
            item.data.tags.map(tag => tags[lang].add(tag))
        }
    });

    for (let [key, tag] of Object.entries(tags)) {
        tags[key] = [...tag].sort();
    }   

    return tags;



};

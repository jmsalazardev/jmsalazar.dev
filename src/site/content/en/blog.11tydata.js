const locale = require('./locale');

module.exports = {
    pagination: {
        before: (paginationData) => paginationData.filter(item => item.data.locale.lang === locale.lang),
    },
};

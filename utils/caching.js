const fs = require('fs');

module.exports = {
    readCache: function () {
        let filename = 'cache.json';

        if (fs.existsSync(filename)) {
            let content = fs.readFileSync(filename);
            return JSON.parse(content);
        } else {
            console.log('cache not found');
            return null;
        }
    },
    saveCache: function (cache) {
        let filename = 'cache.json';
        let content = JSON.stringify(cache);
        fs.writeFileSync(filename, content);
    }
}
const fs = require('fs');

module.exports = {
    readCache: function () {
        let fileName = 'cache.json';

        if (fs.existsSync(fileName)) {
            let content = fs.readFileSync(fileName);
            console.log('hai');
            return JSON.parse(content);
        } else {
            console.log('cache not found');
            return null;
        }
    },
    saveCache: function (cache) {
        let fileName = 'cache.json';
        let content = JSON.stringify(cache);
        fs.writeFileSync(fileName, content);
    }
}
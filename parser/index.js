const auchan = require('./parserAuchan');
const fozzy = require('./parserAuchan');
const any = require('./parserAuchan');

/**
 * Start function
 *
 * @returns {Promise<string>}
 */
async function start() {
    try {
        let result = [];
        result = result.concat(await auchan('https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/'));
        result = result.concat(await fozzy('https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/'));
        result = result.concat(await any('https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/'));
        return JSON.stringify(result);
    } catch (e) {
        console.error(e);
    }

    process.exit(0);
}

start();

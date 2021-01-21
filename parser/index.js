const auchan = require("./parserAuchan");
const fozzy = require("./parserAuchan");
const any = require("./parserAuchan");

/**
 * Start function
 *
 * @returns {Promise<string>}
 */
async function start() {
    try {
        const start = process.hrtime();
        let result = [];
        result = result.concat(
            await auchan(
                "https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/"
            )
        );
        result = result.concat(
            await fozzy(
                "https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/"
            )
        );
        result = result.concat(
            await any("https://auchan.zakaz.ua/uk/categories/buckwheat-auchan/")
        );
        const end = process.hrtime(start);

        console.log("Total time:", end[0] * 1e3 + end[1] * 1e-6);
        return JSON.stringify(result);
    } catch (e) {
        console.error(e);
    }

    process.exit(0);
}

start();

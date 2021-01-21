const request = require("request");
const cheerio = require("cheerio");
const parallelExecution = require("./utils/parallel-execution");

/**
 * Function gets page content and create Cheerio object
 *
 * @param url
 * @returns {Promise<any>}
 */
async function getPage(url) {
    return new Promise((resolve, reject) => {
        request(
            {
                url: url,
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
                }
            },
            (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                return resolve(cheerio.load(body, { decodeEntities: false }));
            }
        );
    });
}

/**
 * Function get all goods from pages
 *
 * @param url
 * @param page
 * @returns {Promise<Array>}
 */
async function getGoodsFromPage(url, page) {
    let result = [];
    const $ = await getPage(url);

    const goods = $(".products-box__list-item").each((i, el) => {
        result.push($(el));
    });

    console.log(`Page ${page}: found ${goods.length}`);
    const nextPage = $('a[data-cy="pagination__direction-link"]');
    if (nextPage.get(0)) {
        const nextGoods = await getGoodsFromPage(nextPage.attr("href"), ++page);
        result = result.concat(nextGoods);
    }

    return result;
}

/**
 * Function gets detailed information from good
 *
 * @param url
 * @returns {Promise<{id: string, date: string, title: string, district: string, area: string, rooms: string, floor: string, maxFloor: string, description: string, seller:  string, photos: Array, props: Array}>}
 */
async function getDetails(url) {
    const $ = await getPage(url);

    return {
        title: $(".big-product-card__title")
            .text()
            .trim(),
        trademarkName: $(".BigProductCardTrademarkName")
            .text()
            .trim(),
        weight: $(
            '.big-product-card__entry-value[data-marker="product_weight"]'
        )
            .text()
            .trim()
    };
}

async function processOneProduct(good) {
    let offerData = {
        price: good
            .find(".Price__value_caption")
            .text()
            .trim(),
        href: `https://auchan.zakaz.ua${good
            .find("a.product-tile")
            .attr("href")
            .replace(/\.html.*/, ".html")}`
    };

    const details = await getDetails(offerData.href);
    offerData = Object.assign(offerData, details);

    return offerData;
}

/**
 * Primary run function
 *
 * @param url
 * @returns {Promise<Array>}
 */
async function run(url) {
    const goods = await getGoodsFromPage(url, 1);
    console.log("Total goods found: " + goods.length);

    const asyncTasks = goods.map(good => () => processOneProduct(good));

    return await parallelExecution(asyncTasks, 5);
}

module.exports = async function(url) {
    try {
        return await run(url);
    } catch (e) {
        throw e;
    }
};

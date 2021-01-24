$(function () {
    $(".video_button").click(function () {
        $(".modal2").addClass("show");
    });
    $(function () {
        $(".modal2_overlay").click(function () {
            $(".modal2").removeClass("show");
        });
    });

    $(".menu_item a, .menu_button").click(function () {
        var elem = $(this).attr("href");
        var dist = $(elem).offset().top;
        var menuHeight = $(".main_header").innerHeight();

        $("html, body").animate({ scrollTop: dist - menuHeight }, 1000);
        $(".menu_item a").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    var clickAmount = 0;
    $(".price_button").click(function () {
        clickAmount++;
        if (clickAmount % 2 == 0) $(".table").addClass("hide");
        else $(".table").removeClass("hide");

        return false;
    });
});

const searchBtn = document.getElementsByClassName(
    "control-panel-search__submit"
)[0];

searchBtn.onclick = async function () {
    const shops = Array.from(
        document.querySelectorAll(
            ".control-panel-shops input[type=checkbox]:checked"
        )
    ).map((el) => [el.name, el.value]);

    const product = document.getElementsByClassName(
        "control-panel-search__text"
    )[0].value;

    if (!product) {
        return;
    }

    const searchParams = new URLSearchParams([...shops, ["product", product]]);

    const response = await fetch(`/search?${searchParams.toString()}`);

    const products = response.ok ? await response.json() : [];

    updateProductsTable(products);
};

function updateProductsTable(productsData) {
    const columns = [
        { name: "shop" },
        { name: "ean" },
        { name: "title" },
        { name: "price", mapper: (value) => (value / 100).toFixed(2) },
    ];
    const table = document.querySelector(".products-table > tbody");

    removeChildren(table);

    for (let i = 0; i < productsData.length; i++) {
        const row = createRow(i + 1, productsData[i], columns);
        table.appendChild(row);
    }

    if (productsData.length === 0) {
        const row = createNotFoundRow(columns.length + 1);
        table.appendChild(row);
    }
}

function createRow(id, rowData, columnsInOrder) {
    const rowElement = document.createElement("tr");

    const cellElement = createCell(id);
    rowElement.appendChild(cellElement);

    for (const column of columnsInOrder) {
        const cellData = column.mapper
            ? column.mapper(rowData[column.name])
            : rowData[column.name];
        const cellElement = createCell(cellData);
        rowElement.appendChild(cellElement);
    }
    return rowElement;
}

function createCell(cellText, colSpan = 1) {
    const cellElement = document.createElement("th");
    cellElement.setAttribute("scope", "col");

    if (colSpan > 1) {
        cellElement.setAttribute("colspan", colSpan.toString());
        cellElement.style["text-align"] = "center";
    }

    cellElement.textContent = cellText;

    return cellElement;
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function createNotFoundRow(columnsCount) {
    const rowElement = document.createElement("tr");

    const cellElement = createCell("No products were found", columnsCount);
    rowElement.appendChild(cellElement);

    return rowElement;
}

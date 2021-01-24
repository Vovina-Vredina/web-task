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

    const searchParams = new URLSearchParams([...shops, ["search", product]]);

    const response = await fetch(
        `/web-task/public/search?${searchParams.toString()}`
    );

    const products = response.ok ? (await response.json()).data : [];

    printProductsTable(products);
};

function printProductsTable(productsData) {
    const columns = [
        { name: "id", header: "#" },
        { name: "shop", header: "Store" },
        { name: "ean", header: "EAN" },
        { name: "title", header: "Title" },
        {
            name: "price",
            header: "Price, UAH",
            mapper: (value) => (value / 100).toFixed(2),
        },
    ];

    const rowsData = productsData.map((product, i) => ({
        ...product,
        id: i + 1,
    }));

    removePrevResults();

    if (rowsData.length) {
        printTable(rowsData, columns);
    } else {
        printNotFoundLabel();
    }
}

function printTable(tableData, columns) {
    const tableContainer = document.getElementsByClassName(
        "price-compare__results"
    )[0];
    const table = document.createElement("table");
    table.className = "table table-bordered products-table";

    const header = createTableHeader(columns);
    table.appendChild(header);

    const body = createTableBody(tableData, columns);
    table.appendChild(body);

    tableContainer.appendChild(table);
}

function createTableHeader(columns) {
    const tableHeader = document.createElement("thead");

    const rowElement = document.createElement("tr");

    for (const column of columns) {
        const cellElement = createCell(column.header);
        rowElement.appendChild(cellElement);
    }

    tableHeader.appendChild(rowElement);

    return tableHeader;
}

function createTableBody(tableData, columns) {
    const tableBody = document.createElement("tbody");

    for (let i = 0; i < tableData.length; i++) {
        const row = createRow(tableData[i], columns);
        tableBody.appendChild(row);
    }

    return tableBody;
}

function createRow(rowData, columnsInOrder) {
    const rowElement = document.createElement("tr");

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

function removePrevResults() {
    const tableContainer = document.getElementsByClassName(
        "price-compare__results"
    )[0];
    if (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }
}

function printNotFoundLabel() {
    const tableContainer = document.getElementsByClassName(
        "price-compare__results"
    )[0];

    const label = document.createElement("p");
    label.style["text-align"] = "center";
    label.style["width"] = "100%";
    label.textContent = "No products were found";

    tableContainer.appendChild(label);
}

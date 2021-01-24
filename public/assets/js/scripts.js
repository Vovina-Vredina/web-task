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

    const searchParams = new URLSearchParams([...shops, ["product", product]]);

    const response = await fetch(`/search?${searchParams.toString()}`);

    console.log(response);
};

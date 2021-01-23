$(function (){
	$(".video_button").click(function() {
		$(".modal2").addClass("show");
	});
	$(function() {
		$(".modal2_overlay").click(function() {
			$(".modal2").removeClass("show");
		})
	});

	$("a").click(function(){
		var elem = $(this).attr("href");
		var dist = $(elem).offset().top;

		$("html, body").animate({"scrollTop": dist}, 1000);
		return false;
	});
})
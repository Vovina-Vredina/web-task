$(function (){

	$(".video_button").click(function() {
		$(".modal2").addClass("show");
	});
	$(function() {
		$(".modal2_overlay").click(function() {
			$(".modal2").removeClass("show");
		})
	});

	$(".menu_item a, .menu_button").click(function(){
		var elem = $(this).attr("href");
		var dist = $(elem).offset().top;
		var menuHeight = $(".main_header").innerHeight();

		$("html, body").animate({"scrollTop": dist - menuHeight}, 1000);
		$(".menu_item a").removeClass("active");
		$(this).addClass("active");
		return false;
	});

	var clickAmount = 0;
	$(".price_button").click(function(){
		clickAmount++;
		if(clickAmount %2 == 0)
			$(".table").addClass("hide");
		else
			$(".table").removeClass("hide");
		
		return false;
	});
	
})
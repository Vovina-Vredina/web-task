$(function (){

	$(".video_button").click(function() {
		$(".modal2").addClass("show");
	});
	$(function() {
		$(".modal2_overlay").click(function() {
			$(".modal2").removeClass("show");
		})
	});

	$(".menu_item a, .menu_button1, .menu_button2").click(function(){
		var elem = $(this).attr("href");
		var dist = $(elem).offset().top;
		var menuHeight = $(".main_header").innerHeight();

		$("html, body").animate({"scrollTop": dist - menuHeight}, 1000);
		if(this.tagName == "A"){
			$(".menu_item").removeClass("active");
			$(this).parent().addClass("active");
		}
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

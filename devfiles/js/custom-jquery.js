$(document).ready(function(){
	var d = new Date();
	var x = document.getElementById("currentYear");
	x.innerHTML = d.getFullYear();

		
		// Start slide animation
		$("#carousel-example-generic").on('slide.bs.carousel', function(event){
			
				$(".caption-item h2").css({left:"-3%", opacity:"0"});
				$(".caption-item h3").css({left:"-3%", opacity:"0"});
				$(".caption-item p").css({left:"-3%", opacity:"0"});
				$(".caption-image.image-right img").css({right:"-5%", opacity:"0"});
				$(".caption-image.image-left img").css({left:"-3%", opacity:"0"});
			
		});
		
		$("#carousel-example-generic").on('slid.bs.carousel', function(event){
			
				$(".caption-item h2 ").css({left:"0", opacity:"1"});
				$(".caption-item h3 ").css({left:"0", opacity:"1"});
				$(".caption-item p ").css({left:"0", opacity:"1"});
				$(".caption-image.image-right img").css({right:"0", opacity:"1"});
				$(".caption-image.image-left img").css({left:"0", opacity:"1"});
			
			});
		
		$('#bs-example-navbar-collapse-1').on('show.bs.collapse', function () {
			 
			$('#carousel-example-generic').hide();
			});
		
		$('#bs-example-navbar-collapse-1').on('hidden.bs.collapse', function () {
			 
			$('#carousel-example-generic').show();
			});
});
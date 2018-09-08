$(function(){
	setInterval("changeImage()", 5000);
});

function changeImage(){
	opacity: 1.0;	
	var $active_image = $('#img_animation img.active');
	var $next_image = $active_image.next();

	if($next_image.length === 0){
		$next_image = $('#img_animation img:first');
	}
	$active_image.fadeTo(800, 0.0, function(){
		$active_image.addClass('hidden');
		$active_image.removeClass('active');
	});
	$next_image.fadeTo(800, 1.0, function(){
		$next_image.removeClass('hidden');
		$next_image.addClass('active');
	});	

}

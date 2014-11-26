function colHeight() {
	var $EqualHeightLi = $('.equalCol');
	var maxHeight = 0;
	$EqualHeightLi.each(function() {
		maxHeight = Math.max(maxHeight, $(this).outerHeight() + 1);
	});
	$EqualHeightLi.css({ "min-height": maxHeight + 'px' });
}

/*
function radioButton() {	
	$('.radioCustom input').click(function() {
		$(this).parents(".radioRow").find(".radioCustom").removeClass("radioCustom-checked");
		$(this).parent(".radioCustom").addClass("radioCustom-checked");
	});
}

function checkBox() {
	$('.checkboxCustom').click(function() {
		$(this).toggleClass('checkboxCustom-checked');		
		var $checkbox = $(this).find(':checkbox');
    $checkbox.attr('checked', !$checkbox.attr('checked'));		
	});
}
*/

$(document).ready(function(){
	colHeight();
	//radioButton();
	//checkBox();
	$(".sidebar li.active").prev("li").find("a").css("border","0");
	$(".mobileMenuIcon").click(function(){
		$("nav ul").slideToggle();
	});	
});
$(window).resize(function(){
	colHeight();
});  
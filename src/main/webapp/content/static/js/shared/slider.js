$(document).ready(function() {
     
    $("#owl-demo").owlCarousel({
     
    navigation : true, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true
     
    // "singleItem:true" is a shortcut for:
    // items : 1,
    // itemsDesktop : false,
    // itemsDesktopSmall : false,
    // itemsTablet: false,
    // itemsMobile : false
     
    });
	$("#owl-demo2").owlCarousel({
		  navigation : true, // Show next and prev buttons
		items :2,
		navigation:true,
		itemsDesktop : [1199,2],
		itemsDesktopSmall : [979,2],
		itemsMobile:[550,1]
		 
								
		});
     
    
	

});
$(document).ready(function(){

	$('select').each(function(){
		var selectName = $(this).attr("name");
		var selectId =  $(this).attr("id");
    	var $this = $(this), numberOfOptions = $(this).children('option').length;

		$this.addClass('select-hidden');
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled selected_'+selectName+'"></div>');


		var $styledSelect = $this.next('div.select-styled');
		$styledSelect.text($this.children('option').eq(0).text());

		var styledSelectRel = $this.children('option').eq(0).text();
		$styledSelect.attr("rel", styledSelectRel);

		var $list = $('<ul />', {'class': 'select-options option_'+selectName+'', 'id': selectId + '_options'}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}

		var $listItems = $list.children('li');

		$styledSelect.click(function(e) {
			e.stopPropagation();
			$('div.select-styled.active').each(function(){
				$(this).removeClass('active').next('ul.select-options').hide();
			});
			$(this).toggleClass('active').next('ul.select-options').slideToggle(200);
		});

		$listItems.click(function(e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			var selectedRel = $(this).attr('rel');
			$styledSelect.attr("rel", selectedRel);
			$this.val($(this).attr('rel'));
			//alert($(this).text());
			$list.hide();
		  	//console.log($this.val());
    	});

		$(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});
});
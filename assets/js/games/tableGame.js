$(function () {
	var table = $('#game-table');
	table.on('click', 'td', function(event){
		var td = $(event.target);
		if(td.hasClass('right') || td.hasClass('wrong')){
			td.removeClass('right').removeClass('wrong');
			return;
		}
		var num = + td.text();
		if((num % 2) === 0){
			td.addClass('right');
		}else{
			td.addClass('wrong');
		}
	})
});
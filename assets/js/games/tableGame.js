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
	});
});

window.validateGame = function(cb){
	if($('#game-table .wrong').length > 0){
		return cb(false);
	}
	var tds = $('#game-table td');
	for (var i = tds.length - 1; i >= 0; i--) {
		var num = + $(tds[i]).text();
		if((num % 2) === 0){
			if(!$(tds[i]).hasClass('right')){
				return cb(false);
			}
		}
	};
	return cb(true);
}
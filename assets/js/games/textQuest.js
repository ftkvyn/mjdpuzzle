var win = false;

$(function () {
	$('.action_1 ul li').click(function(event){
		var li = $(this);
		var action = +li.attr('data-action');
		if(action == 1){
			$('.action_1 .state_1').hide();
			$('.action_1 .state_3').hide();
			$('.action_1 .state_2').show();
		}else if(action == 2){
			$('.action_1').hide();
			$('.action_2').show();
		}else if(action == 3){
			$('.action_1 .state_1').hide();
			$('.action_1 .state_2').hide();
			$('.action_1 .state_3').show();
		}
	});

	$('.action_2 ul li').click(function(event){
		var li = $(this);
		var action = +li.attr('data-action');
		if(action == 1){
			var code = $('.action_2 .code').val();
			if(code != '4235'){
				$('.action_2 h2').hide();
				$('.action_2 .state_fail').show();
				return;
			}else{
				win = true;
				$('.action_2').hide();
				$('.action_3').show();
				return;
			}
		}else if(action == 2){
			$('.action_2 .action_look').hide();
			$('.action_2 .action_read').show();
			$('.action_2 h2').hide();
			$('.action_2 .state_2').show();
		}else if(action == 3){
			$('.action_2 h2').hide();
			$('.action_2 .state_code').show();
		}
	});
});

window.validateGame = function(cb){
	return cb(win);
}
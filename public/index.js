$(document).ready(function(){
	var $setup = $("#setup");
	var $show= $("#showPunchline");
	var $punchline = $("#punchline");
	var $container = $("#punchlineContainer")
	var $score = $("#score");
	var currentId = -1;
	
	var getJoke = function(){
		$.get("./jokes", function(data){
			$setup.html(data.setup);
			$punchline.html(data.punchline);
			$container.css("opacity", "0");
			$score.html(data.score)
			currentId = data.id;
			
		});
	}
	getJoke();
	$("#getNew").click(function(){
		getJoke();
	})

	$show.click(function(){
		$container.css("opacity", "1")
	});

	$("#up").click(function(){
		$.post({
			url: "/upvote",
			contentType: "application/json",
			data: JSON.stringify({id: currentId}),
			success: function(data){
				$score.html(data.newScore);
			}
		});
	});

	$("#down").click(function(){
		$.post({
			url: "/downvote",
			contentType: "application/json",
			data: JSON.stringify({id: currentId}),
			success: function(data){
				$score.html(data.newScore);
			}
		});
	});


})


$(document).ready(function(){
	var $setup = $("#setup");
	var $show= $("#showPunchline");
	var $punchline = $("#punchline");
	var $container = $("#punchlineContainer")
	var $score = $("#score");
	var currentId = -1;
	
	var getJoke = function(){
		$setup.html("Loading...");
		$container.css("opacity", "0")
		$.get("./oneJoke", function(data){
			$setup.html(data.setup);
			$punchline.text(data.punchline);
			$score.html(data.score)
			currentId = data._id;
			
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
		$score.html("...")
		$.ajax({
			url: "/upvote",
			contentType: "application/json",
			data: JSON.stringify({id: currentId}),
			type: "PUT",
			success: function(data){
				$score.html(data.newScore);
			}
		});
	});

	$("#down").click(function(){
		$score.html("...")
		$.ajax({
			url: "/downvote",
			contentType: "application/json",
			data: JSON.stringify({id: currentId}),
			type: "PUT",
			success: function(data){
				$score.html(data.newScore);
			}
		});
	});


})


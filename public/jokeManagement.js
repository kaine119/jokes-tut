$(document).ready(function(){
	var populateJokes = function() {
		$.get("/allJokes", function(data){
			var optionsHtml = '';
			$("#jokesList").empty();
			data.forEach(function(element, index, array){
				$("#jokesList")
					.append(
						$("<option></option>")
						.attr("value", element._id)
						.text(element.setup + " " + element.punchline)
					);
			})
		});
	};

	$("#addJoke").submit(function(event){
		event.preventDefault();

		var setup = $("#setupIn").val();
		var punchline = $("#punchlineIn").val();

		$.post({
			url: "/createJoke",
			contentType: "application/json",
			data: JSON.stringify({
				"setup": setup,
				"punchline": punchline,
				"score": 0
			}),
			success: function(data){
				console.log("added a joke")
				populateJokes();
				$("#setupIn").val('');
				$("#punchlineIn").val('');
				$("#createSuccessNotif").fadeIn(0);
				$("#createSuccessNotif").fadeOut(1000);
			}
		})
	});

	$("#delJoke").submit(function(event){
		event.preventDefault();
	});


	$("#refreshJokes").click(function(){
		populateJokes();
	});

	$("#deleteJoke").click(function(){
		$.ajax({
			url: "deleteJoke",
			type: "DELETE",
			contentType: "application/json",
			data: JSON.stringify({
				id: $("#jokesList").val()
			}),
			success: function(data){
				console.log(data);
				populateJokes();
			}
		});
	})

	
	populateJokes();
	$("#createSuccessNotif").fadeOut(0)
});


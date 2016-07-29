// $(document).ready(function(){
	// var $setup = $("#setup");
	// var $show = $("#showPunchline");
	// var $punchline = $("#punchline");

	$.get("/jokes", function(res){
		console.log(res)
		console.log("hi!")
	});
// });
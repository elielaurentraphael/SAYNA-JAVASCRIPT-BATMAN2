function quiz(x) {
	$.ajax({
		url: "https://batman-api.sayna.space/questions",
		datatype: "json",
		success: function (questions) {
			let y = parseInt(x);
			$(".numero").text(y + 1 + "/" + 12);
			$(".question").text(questions[x]["question"]);
			$(".res:first-child label").text(questions[x]["response"][0]["text"]);
			$(".res:nth-child(2) label").text(questions[x]["response"][1]["text"]);
			$(".res:last-child label").text(questions[x]["response"][2]["text"]);
		},
		error: function () {
			console.log("Défaut de connexion !");
		},
	});
}

$(".next").click(function () {
	$(".startQuiz, .flecheDown.down").fadeOut();
	$(".quiz").fadeIn();
	$(".next").text("question suivante");
	quiz(8);
});

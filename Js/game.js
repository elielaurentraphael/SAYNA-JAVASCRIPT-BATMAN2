const numer = document.querySelector(".numero");
const questio = document.querySelector(".question");
const labelun = document.querySelector(".res:first-child label");
const labeldeux = document.querySelector(".res:nth-child(2) label");
const labeltrois = document.querySelector(".res:last-child label");

let bouton = document.querySelector(".next");
bouton.textContent = "démarrer le quiz";

function quiz(x) {
	$.ajax({
		url: "https://batman-api.sayna.space/questions",
		datatype: "json",
		success: function (questions) {
			let u = questions.length;
			let y = parseInt(x);
			$(".numero").text(y + 1 + "/" + u);
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

bouton.addEventListener("click", () => {
	if (bouton.textContent === "démarrer le quiz") {
		$(".startQuiz, .flecheDown.down").fadeOut();
		$(".quiz").fadeIn();
		quiz(0);
		bouton.textContent = "question suivante";
	} else {
		$(".question").empty();
		$(".res:first-child label").empty();
		$(".res:nth-child(2) label").empty();
		$(".res:last-child label").empty();
		let splitNum = $(".numero").text();
		let letter = splitNum[0];
		quiz(letter);
	}
});

// Déclaration des variables:

const numer = document.querySelector(".numero"); // numéro de la question - format (string): A/A ou A/AA
const questio = document.querySelector(".question"); // question
const labelun = document.querySelector(".res:first-child label"); // réponse possible  parmi les trois proposés
const labeldeux = document.querySelector(".res:nth-child(2) label"); // réponse possible  parmi les trois proposés
const labeltrois = document.querySelector(".res:last-child label"); // réponse possible  parmi les trois proposés

let bouton = document.querySelector(".next"); // bouton pour démarrer le quiz ou pour voir la question suivante
bouton.textContent = "démarrer le quiz"; // étiquette du bouton au démarrage (l'autre étiquette est: "question suivante")

// Extraction du nombre des questions (fait balader la souris au dessous du logo batman pour le voir)

$.ajax({
	url: "https://batman-api.sayna.space/questions",
	datatype: "json",
	success: function (questions) {
		let u = questions.length;
		$(".nombreQuestion").text(u); // info du nombre de question avant de commencer le quiz
		console.log(`Nombre de questions: ${u}`);
	},
	error: function () {
		console.log("Défaut de connexion !");
	},
});

// fonction d'affichage: Question / Réponses

function jeux(x) {
	$.ajax({
		url: "https://batman-api.sayna.space/questions",
		datatype: "json",
		success: function (questions) {
			let u = questions.length;
			let y = parseInt(x);
			$(".numero").text(y + 1 + "/" + u); // affichage numéro de la question
			$(".question").text(questions[x]["question"]); // affichage de la question
			$(".res:first-child label").text(questions[x]["response"][0]["text"]); // réponse probable parmi les trois proposées
			$(".res:nth-child(2) label").text(questions[x]["response"][1]["text"]); // réponse probable parmi les trois proposées
			$(".res:last-child label").text(questions[x]["response"][2]["text"]); // réponse probable parmi les trois proposées
			$(".res:first-child span").text(questions[x]["response"][0]["isGood"]); // réponse vraie ou fausse
			$(".res:nth-child(2) span").text(questions[x]["response"][1]["isGood"]); // réponse vraie ou fausse
			$(".res:last-child span").text(questions[x]["response"][2]["isGood"]); // réponse vraie ou fausse
			$(".next").attr("disabled", "disabled"); // le bouton est de nouveau "enbled" après le choix de réponse
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
		jeux(0);
		bouton.textContent = "question suivante";
		choose();
	} else {
		let splitNum = $(".numero").text();
		let lengtha = splitNum.length;
		let letter;
		if (lengtha == 4) {
			letter = splitNum[0];
		} else {
			letter = splitNum[0] + splitNum[1];
			console.log(`letter = ${letter}`);
		}
		if (letter == $(".nombreQuestion").text()) {
			$(".quiz").fadeOut();
			$(".next").fadeOut();
			$(".result").css("display", "block");
		} else {
			$(".res:first-child input").prop("checked", false);
			$(".res:nth-child(2) input").prop("checked", false);
			$(".res:last-child input").prop("checked", false);
			jeux(letter);
			choose();
		}
	}
});

const resInputs = document.querySelectorAll(".res input");
const span = document.querySelector(".res:last-child span");

function choose() {
	resInputs.forEach((resInput) => {
		resInput.addEventListener("change", (e) => {
			console.log(e.target.id);
			$(".next").removeAttr("disabled");
			if (span.textContent === "true") {
				console.log("Marina 'zany eh !");
			}
		});
	});
}

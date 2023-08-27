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
			$(".next").attr("disabled", "disabled"); // le bouton est de nouveau "enabled" après le choix de réponse
		},
		error: function () {
			console.log("Défaut de connexion !"); // signalisation de la défaillance reseau dans la console
		},
	});
}

// on démarre le quiz en appuyant sur le bouton "démarrer lr quiz"
bouton.addEventListener("click", () => {
	if (bouton.textContent === "démarrer le quiz") {
		$(".startQuiz, .flecheDown.down").fadeOut(); // faire disparaitre l'image de batman et la flèche
		$(".quiz").fadeIn(); // faire apparaitre la console du quiz
		jeux(0); // la console du quiz avec la première question et la proposition des trois réponses
		bouton.textContent = "question suivante"; // l'étiquette du bouton change "démarrer le quiz" devient "question suivante"
		choose(); // choisir une réponse parmi les trois proposées en cochant une case
	} else {
		let splitNum = $(".numero").text(); // le numéro d'une question est du type string de longueur 4 ou 5
		let lengtha = splitNum.length;
		let letter;
		if (lengtha == 4) {
			// numéro < 10 - format: s/ss - c'est à dire longueur = 4
			letter = splitNum[0]; // dans ce cas, on met le premier élément dans la variable letter
		} else {
			// dans le cas où la longueur du numéro est 5; on met le premier et deuxième éléments dans la variable letter
			letter = splitNum[0] + splitNum[1];
			console.log(`letter = ${letter}`);
		}
		if (letter == $(".nombreQuestion").text()) {
			// si le numéro de la question = nombre de question: c'est la fin du quiz
			$(".quiz").fadeOut(); // après le choix de la réponse, on fait disparaitre la console du quiz
			$(".next").fadeOut();
			$(".result").css("display", "block"); // on affiche le résultat
		} else {
			// numéro de la question < nombre de questions, on continue le quiz
			$(".res:first-child input").prop("checked", false);
			$(".res:nth-child(2) input").prop("checked", false); // on vide les cases à cocher
			$(".res:last-child input").prop("checked", false);
			jeux(letter); // on attaque la question suivante
			choose(); // choix d'une réponse
		}
	}
});

const resInputs = document.querySelectorAll(".res input"); // on pointe les cases à cocher
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

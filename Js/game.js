// Déclaration des variables:

const numer = document.querySelector(".numero"); // numéro de la question - format (string): A/A ou A/AA
const questio = document.querySelector(".question"); // question
// réponse possible  parmi les trois proposés
const labelun = document.querySelector(".res:first-child label");
// réponse possible  parmi les trois proposés
const labeldeux = document.querySelector(".res:nth-child(2) label");
// réponse possible  parmi les trois proposés
const labeltrois = document.querySelector(".res:last-child label");

// on pointe les cases à cocher
const resInputs = document.querySelectorAll(".res input");
// on pointe l'indice de la vraie réponse
const span = document.querySelector(".res:last-child span");
// on sélectionne les indices de vérité
const isGoods = document.querySelectorAll(".isGood");
// on cible l'affichage de la note
const note = document.querySelector(".note");
// on initialise la note à 0 (zéro)
note.textContent = 0;

// bouton pour démarrer le quiz ou pour voir la question suivante
let bouton = document.querySelector(".next");
// étiquette du bouton au démarrage (l'autre étiquette est: "question suivante")
bouton.textContent = "démarrer le quiz";

// Extraction du nombre des questions (fait balader la souris au dessous du logo batman pour le voir)

$.ajax({
	url: "https://batman-api.sayna.space/questions",
	datatype: "json",
	success: function (questions) {
		let u = questions.length;
		$(".nombreQuestion").text(u); // info du nombre de question avant de commencer le quiz
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
			// affichage numéro de la question
			$(".numero").text(y + 1 + "/" + u);
			imageQuestion(y + 1);
			// affichage de la question
			$(".question").text(questions[x]["question"]);
			// réponse probable parmi les trois proposées
			$(".res:first-child label").text(questions[x]["response"][0]["text"]);
			// réponse probable parmi les trois proposées
			$(".res:nth-child(2) label").text(questions[x]["response"][1]["text"]);
			// réponse probable parmi les trois proposées
			$(".res:last-child label").text(questions[x]["response"][2]["text"]);
			// réponse vraie ou fausse
			$(".res:first-child span").text(questions[x]["response"][0]["isGood"]);
			// réponse vraie ou fausse
			$(".res:nth-child(2) span").text(questions[x]["response"][1]["isGood"]);
			// réponse vraie ou fausse
			$(".res:last-child span").text(questions[x]["response"][2]["isGood"]);
			// le bouton est de nouveau "enabled" après le choix de réponse
			$(".next").attr("disabled", "disabled");
		},
		// signalisation de la défaillance reseau
		error: function () {
			$(".numero").text("Défaut de connexion !");
			$(".question").text("Défaut de connexion !");
			$(".res:first-child label").text("Défaut de connexion !");
			$(".res:nth-child(2) label").text("Défaut de connexion !");
			$(".res:last-child label").text("Défaut de connexion !");
		},
	});
}

// fonction d'affichage des images suivant le numéro de la question (m)
// apparition progressive des images de quiz avec un zoom de 0% à 100%

function imageQuestion(m) {
	if (m === 1) {
		$(`.imageQuestion-${m}`).css({
			visibility: "visible",
			opacity: "1",
			transform: "scale(1)",
			transition: "visibility 3s ease, opacity 3s ease, transform 3s ease",
		});
	} else {
		$(`.imageQuestion-${m - 1}`).css({
			visibility: "hidden",
			opacity: "0",
			transform: "scale(0)",
			transition: "visibility 3s ease, opacity 3s ease, transform 3s ease",
		});
		$(`.imageQuestion-${m}`).css({
			visibility: "visible",
			opacity: "1",
			transform: "scale(1)",
			transition: "visibility 3s ease, opacity 3s ease, transform 3s ease",
		});
	}
}

// fonction de désactivation des cases à cocher après le choix de la réponse

function disabled() {
	// on désactive les cases à cocher
	$(".res:first-child input").prop("disabled", true);
	$(".res:nth-child(2) input").prop("disabled", true);
	$(".res:last-child input").prop("disabled", true);
	questionSuivante();
}

// autorisation pour l'affichage de la question suivante

function questionSuivante() {
	$(".next").removeAttr("disabled");
}

// fonction d'activation des cases à cocher après l'affichage de la question

function enabled() {
	// on active les cases à cocher
	$(".res:first-child input").prop("disabled", false);
	$(".res:nth-child(2) input").prop("disabled", false);
	$(".res:last-child input").prop("disabled", false);
}

// fonction d'éffacement des cochages éventuels des cases à cocher avant l'affichage de la question suivante

function unchecked() {
	// on vide les cases à cocher
	$(".res:first-child input").prop("checked", false);
	$(".res:nth-child(2) input").prop("checked", false);
	$(".res:last-child input").prop("checked", false);
}

// fonction de rappel du numéro de la question encours pour préparer le numéro de la question suivante

function numera() {
	let numero = numer.textContent;
	let numeroLength = numero.length;
	let numb;
	if (numeroLength < 5) {
		numb = numero[0];
	} else {
		numb = numero[0] + numero[1];
	}
	return numb;
}

// on démarre le quiz en appuyant sur le bouton "démarrer lr quiz"

bouton.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	if (bouton.textContent === "démarrer le quiz") {
		// faire disparaitre l'image de batman et la flèche
		$(".startQuiz, .flecheDown.down").fadeOut();
		// chargement de la première question et la proposition des trois réponses
		jeux(0);
		// l'étiquette du bouton change "démarrer le quiz" devient "question suivante"
		bouton.textContent = "question suivante";
		// faire apparaitre la console du quiz
		$(".quiz").fadeIn();
		// choisir une réponse parmi les trois proposées en cochant une case
		choose();
	} else {
		let letter;
		letter = numera();
		// si le numéro de la question = nombre de question: c'est la fin du quiz
		if (letter == $(".nombreQuestion").text()) {
			// après le choix de la réponse de la dernière question, l'action sur le bouton "question suivante" fait disparaitre la console du quiz et, ->
			$(".quiz").fadeOut();
			$(".next").fadeOut();
			// -> affiche le résultat avec la possibilité de refaire le quiz
			resultat();
		} else {
			// numéro de la question < nombre de questions, on continue le quiz

			// on active les cases à cocher
			enabled();
			// on éfface les cochages éventuels
			unchecked();

			// on affiche la question suivante
			jeux(letter);
			// choix d'une réponse
			choose();
		}
	}
});

// fonction pour choisir une réponse

function choose() {
	let z = parseInt(note.textContent);
	// pour chaque case à cocher
	resInputs.forEach((resInput) => {
		// on écoute l'événement "change"
		resInput.addEventListener("change", (e) => {
			// chaque bonne réponse vaut 1 point, mauvaise réponse vaut 0
			let j = e.target.id;
			if (isGoods[j].textContent === "true") {
				z++;
				note.textContent = z;
				disabled();
			} else {
				disabled();
			}
		});
	});
}

// affichage du résultat

function resultat() {
	// on affiche le résultat
	//$(".result").css("display", "block");
	//$(".resultat").css("display", "block");
	$(".resultat").fadeIn();

	// cette ligne fait apparaître le résultat avec un zoom de 0 à 100%. Pour que cet effet (zoom de 0 à 100%) se produit, on doit envelopper la classe .result dans une autre classe .resultat et, on doit utiliser "$(".resultat").fadeIn();" pour supprimer la règle "display: none;" de la classe .resultat au lieu de "$(".resultat").css("display", "block");".
	$(".result").css({
		visibility: "visible",
		opacity: "1",
		transform: "scale(1)",
		transition: "visibility 10s ease, opacity 10s ease, transform 10s ease",
	});

	// récuperation du bouton pour recommencer le quiz
	const buttona = document.querySelector(".buttona");
	// la note ou les points obtenus par l'utilisateur
	let point = $(".note").text() + "/" + $(".nombreQuestion").text();

	// note inférieure ou égale à 4
	if (parseInt(note.textContent) <= 4) {
		$(".result .box-result .box-titre p").html(
			`<span>${point} </span> c'est pas tout a fait ça...`
		);
		$(".result .box-result .box-texte").html(
			"<p>Oula ! Heureusement que le Riddler est sous les verrous... Il faut que<br />vous vous repassier les films, cette fois en enlevant peut-être le<br />masque qui vous a bloqué la vue ! Aller, rien n'est perdu !</p>"
		);
		// note supérieure à 4 (exclu) et inférieure à 9 (exclu)
	} else if (parseInt(note.textContent) > 4 && parseInt(note.textContent) < 9) {
		$(".result .box-result .box-titre p").html(
			`<span>${point} </span> pas mal !`
		);
		$(".result .box-result .box-texte").html(
			"<p>Encore un peut d'entrainement avec le Chevalier Noir vous serait<br />bénéfique, mais vous pouvez marcher la tête haute, vos<br />connaissances sont là. A vous de les consolider, foncer Gotham est<br />votre terrain de chasse !</p>"
		);
		// note supérieure ou égale à 9
	} else {
		$(".result .box-result .box-titre p").html(
			`<span>${point} </span> bravo !`
		);
		$(".result .box-result .box-texte").html(
			"<p>Vous êtes véritablement un super fan de l'univers de Batman !<br />Comics, films, rien ne vous échappe. Bruce Wayne a de quoi être fier,<br />Gotham est en paix et Batman peut prendre sa retraite, vous veillez<br />aux grains !</p>"
		);
	}

	// on peut récommencer le quiz
	buttona.addEventListener("click", () => {
		window.location.reload();
	});
}

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
			console.log(`n° question = ${y + 1}`);
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

bouton.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
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
			$(".quiz").fadeOut(); // après le choix de la réponse, l'action sur le bouton "question suivante" fait disparaitre la console du quiz et, ->
			$(".next").fadeOut();
			$(".result").css("display", "block"); // -> affiche le résultat
		} else {
			// numéro de la question < nombre de questions, on continue le quiz

			$(".res:first-child input").prop("checked", false);
			$(".res:nth-child(2) input").prop("checked", false); // on vide les cases à cocher
			$(".res:last-child input").prop("checked", false);

			//const res = document.querySelector(".res");
			const ress = document.querySelectorAll(".res");

			jeux(letter); // on attaque la question suivante
			choose(); // choix d'une réponse
		}
	}
});

const resInputs = document.querySelectorAll(".res input"); // on pointe les cases à cocher
const span = document.querySelector(".res:last-child span"); // on pointe l'indice de la vraie réponse
const isGoods = document.querySelectorAll(".isGood"); // on sélectionne les indices de vérité
const note = document.querySelector(".note"); // on cible la class note
note.textContent = 0;
//console.log(typeof parseInt(note.textContent));
//let x = parseInt(note.textContent);
//console.log(typeof parseInt(x));
//note.textContent = points;

// fonction choisir une réponse

function choose() {
	//let points = 0;
	let z = parseInt(note.textContent);
	resInputs.forEach((resInput) => {
		// pour chaque case à cocher
		resInput.addEventListener("change", (e) => {
			// on écoute l'événement "change"
			let j = e.target.id;
			$(".next").removeAttr("disabled");
			if (isGoods[j].textContent === "true") {
				// chaque bonne réponse vaut ->
				console.log(`e.target.id = ${j}`);
				// let z = parseInt(note.textContent);
				z++;
				console.log(`z++ = ${z}`);
				note.textContent = z;
				console.log(`note = ${z}`);

				//nota();
				console.log("OK! OK! OK!");
				/**
				points++;
				note.textContent = points; // -> 1 point
				*/
			}
		});
	});
	return z;
}

console.log(`zeda = ${choose()}`);

//console.log("Marina 'zany eh !");

/**
function nota() {
	note.textContent = note.textContent + 1;

	//points++;
	//note.textContent = points;
	console.log("bla! bla! bla!");
}
*/

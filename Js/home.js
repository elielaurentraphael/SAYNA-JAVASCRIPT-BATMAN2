// SCROLLING PROGRESSIF

$(document).ready(function () {
	$(".jsScrollBut").on("click", function () {
		// Au clic sur le bouton "VOIR LE HEROS"
		// Page cible
		const page = $(this).attr("href");
		// Durée de l'animation (en ms)
		const speed = 1300;
		$("html, body").animate({ scrollTop: $(page).offset().top + 150 }, speed); // cette ligne produit l'effet scrolling progressif vers les adresses (ancres)
		return false;
	});

	$(".jsScrollButa").on("click", function () {
		// Au clic sur le bouton "LES ADVERSAIRES"
		// Page cible
		const page = $(this).attr("href");
		// Durée de l'animation (en ms)
		const speed = 1800;
		$("html, body").animate({ scrollTop: $(page).offset().top + 150 }, speed); // cette ligne produit l'effet scrolling progressif vers les adresses (ancres)
		return false;
	});
});

// TOUTES LES IMAGES DU DOSSIER "Batsliders" DEFILENT UNE à UNE AVEC UN DELAIS DE 5s

// on pointe l'élément image de classa .justiceImage
const image = document.querySelector(".justiceImage img");
// on stocke les sources des images de Batsliders dans un array "srcArray"
const srcArray = [
	"./Assets/Batsliders/Batslider1.png",
	"./Assets/Batsliders/Batslider2.png",
	"./Assets/Batsliders/Batslider3.png",
	"./Assets/Batsliders/Batslider4.png",
	"./Assets/Batsliders/Batslider5.png",
	"./Assets/Batsliders/Batslider6.png",
	"./Assets/Batsliders/Batslider7.png",
	"./Assets/Batsliders/Batslider8.png",
	"./Assets/Batsliders/Batslider9.png",
	"./Assets/Batsliders/Batslider10.png",
];
// stockage du numéro de l'image de srcArray dans la variable variable "index" et initialisation à 0
let index = 0;

// function pour faire défiler les images toutes les 5s

const loop = () => {
	setTimeout(() => {
		if (index < srcArray.length - 1) {
			affichage();
			index++;
			loop();
		} else if (index === srcArray.length - 1) {
			affichage();
			index = 0;
			loop();
		}
	}, 5000);
};
loop();

function affichage() {
	$(".justiceImage img")
		.attr("src", srcArray[index - 1])
		.hide();
	$(".justiceImage img")
		.attr("src", srcArray[index])
		.hide()
		.css({ left: "-100%" })
		.show()
		.animate({ left: "0" }, 1000);
}

// CREATION D'UNE DIVISION (div) CLASS (popupbox)

// sélection du bouton "CONFIRMER" du contact
const btnConfirmer = document.getElementById("confirmer");
// sélection des éléments cibles
const contact = document.getElementById("contact");
const title = document.querySelector("#contact h1");
const form = document.querySelector("form");
const email = document.querySelector(".email input");
const checkbox = document.querySelector(".pa input");
const option = document.querySelector(".frequence select");
const films = document.getElementById("films");
const comics = document.getElementById("comics");
const tout = document.getElementById("tout");
let clicked = false;

// choix des news (films, comics, tout)

films.addEventListener("click", ok);
comics.addEventListener("click", ok);
tout.addEventListener("click", ok);

function ok(e) {
	clicked = true;
	let etiquette = e.target.id;
	let semi = $(`#${etiquette}`).val().split(" ");
	$(`#${etiquette}`).val(`${semi[0]} ${etiquette} V`);
}

btnConfirmer.addEventListener("click", function (e) {
	// on évite le comportement par défaut du bouton submit
	e.preventDefault();

	if (
		!email.value ||
		!checkbox.checked ||
		option.value ===
			"Choisissez la fréquence à laquelle vous souhaitez recevoir votre newsletter" ||
		!clicked
	) {
		affichagePopupbox(
			"<div><p>renseignez votre adresse e-mail</p><p>acceptez de recevoir l'actualité Batman</p><p>choisissez la fréquence de newsletter</p><p>precisez les news que vous souhaitez recevoir</p></div>"
		);
		setTimeout(() => {
			location.reload();
		}, 8000);
	} else {
		affichagePopupbox("message reçu !");
		clearPopupbox();
	}
});

// création d'un div popupbox
const popupbox = document.createElement("div");

// affichage du popupbox
function affichagePopupbox(message) {
	// insertion du popupbox dans le div contact (popupbox enfant du contact)
	contact.append(popupbox);

	// suppression du titre et du formulaire du contact
	title.style.display = "none";
	form.style.display = "none";

	// affichage du popupbox
	popupboxa(message);
}

function popupboxa(messageText) {
	// padding 5vw de la boîte contact
	contact.style.padding = "5vw";

	// mise en forme de la boîte popupbox
	popupbox.style.width = "65vw";
	popupbox.style.height = "30vw";
	popupbox.style.background =
		"linear-gradient(315deg, rgba(25, 88, 125, .3)16%, rgb(237, 222, 191, .3)96%)";
	popupbox.style.margin = "auto";
	popupbox.style.borderRadius = "1vw";

	// texte du message
	popupbox.innerHTML = messageText;

	// styles de la boîte popupbox et du texte du message
	popupbox.style.display = "flex";
	popupbox.style.alignItems = "center";
	popupbox.style.justifyContent = "center";
	popupbox.style.textTransform = "uppercase";
	popupbox.style.fontWeight = "bold";
	popupbox.style.letterSpacing = "0.2vw";
	popupbox.style.fontSize = "1.5vw";
}

// effacement du popupbox et blocage du bouton submit
function clearPopupbox() {
	setTimeout(() => {
		contact.style.padding = "0";
		popupbox.style.display = "none";
		title.style.display = "block";
		form.style.display = "block";
		$("#confirmer").prop("disabled", true);
	}, 6000);
}

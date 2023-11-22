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

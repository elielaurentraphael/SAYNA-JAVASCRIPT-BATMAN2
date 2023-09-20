// SCROLLING PROGRESSIF

$(document).ready(function () {
	$(".jsScrollBut").on("click", function () {
		// Au clic sur le bouton "VOIR LE HEROS"
		var page = $(this).attr("href"); // Page cible
		var speed = 1300; // Durée de l'animation (en ms)
		$("html, body").animate({ scrollTop: $(page).offset().top + 150 }, speed); // cette ligne produit l'effet scrolling progressif vers les adresses (ancres)
		return false;
	});

	$(".jsScrollButa").on("click", function () {
		// Au clic sur le bouton "LES ADVERSAIRES"
		var page = $(this).attr("href"); // Page cible
		var speed = 1800; // Durée de l'animation (en ms)
		$("html, body").animate({ scrollTop: $(page).offset().top + 150 }, speed); // cette ligne produit l'effet scrolling progressif vers les adresses (ancres)
		return false;
	});
});

// TOUTES LES IMAGES DU DOSSIER "Batsliders" DEFILENT UNE à UNE AVEC UN DELAIS DE 5s

// on pointe l'élément image de classa .justiceImage
const image = document.querySelector(".justiceImage");
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
let index = 1;

// function pour faire défiler les images toutes les 5s

const loop = () => {
	setTimeout(() => {
		if (index < srcArray.length) {
			affichage();
			index++;
			loop();
		} else if (index === srcArray.length) {
			affichage();
			index = 1;
			loop();
		}
		index;
	}, 5000);
};
loop();

function affichage() {
	$(".justiceImage")
		.hide()
		.css({ left: "-25%" })
		.attr("src", `./Assets/Batsliders/Batslider${index}.png`)
		.show()
		.animate({ left: "0" }, 100);
}

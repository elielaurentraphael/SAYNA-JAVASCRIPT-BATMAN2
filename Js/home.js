// Scrolling progressif
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

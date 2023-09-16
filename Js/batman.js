// CANVAS ANIMATION:

const canvaso = document.querySelector("canvas");
const ctx = canvaso.getContext("2d");
const width = (canvaso.width = document.body.clientWidth);
const height = (canvaso.height = document.documentElement.clientHeight);

let chauveSouris = new Image(); // Crée une image chauveSouris
chauveSouris.addEventListener(
	"load",
	function () {
		document.addEventListener("mousemove", (e) => {
			// récupération de la position de la souris
			let x = e.clientX;
			let y = e.clientY;
			// Clear le canvas avant de dessiner à nouveau
			ctx.clearRect(0, 0, width, height);
			//  drawImage chauveSouris dans le canvas et, pour que l'image chauveSouris suit le mouvement de la souris  on prend e.clientX et e.clientY comme coordonnées du coin supérieur gauche de l'image chauveSouris. On reduit aussi la taille de l'image chauveSouris à 30px de large et à 18px de haut.
			ctx.drawImage(chauveSouris, x, y, 30, 18);
		});
	},
	false
);
chauveSouris.src = "../Assets/logos/logo_bat_flèche_2.png"; // chemin de la source

// SCROLLING PROGRESSIF COMMANDE PAR LES BOUTONS LATERAUX

$(document).ready(function () {
	$(".jsScroll").on("click", function () {
		// Au clic sur un élément (#flecheHaut ou #flecheBas)
		var page = $(this).attr("href"); // Page cible
		var speed = 5500; // Durée de l'animation (en ms)
		$("html, body").animate({ scrollTop: $(page).offset().top }, speed); // cette ligne produit l'effet scrolling progressif vers les adresses (ancres)
		return false;
	});
});

// APPARITON PROGRESSIVE DES ELEMENTS AVEC FADEIN ET SLIDE

// cibler toutes les class .fadeInSlideScroll pour l'apparition progressif des éléments avec fade-In + slide
const fadeInSlideScrollElements =
	document.querySelectorAll(".fadeInSlideScroll");

// vérifier si l'élément est visible à l'écran
function isElementVisible(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

// apparition progressive des éléments (.fadeInSlideScroll) fade-In + slide
function handleScrollFadeSlide() {
	fadeInSlideScrollElements.forEach((element) => {
		if (isElementVisible(element)) {
			element.style.opacity = "1";
			element.style.visibility = "visible";
			element.style.transform = "translateX(0)";
			element.style.transition =
				"opacity 3s ease, visibility 3s ease, transform 3s ease";
		}
	});
}

// gerer l'événement de défilement et l'apparition progressive
window.addEventListener("scroll", handleScrollFadeSlide);

// Appel de la fonction handleScrollFadeSlide
handleScrollFadeSlide();

// ZOOM PROGRESSIF DE 0 à 1

// cibler toutes les classe "zoomImage"
const zoomImages = document.querySelectorAll(".zoomImage");

// vérifier si l'image est visible à l'écran
function isImageVisible(image) {
	const rect = image.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

// zomm progressif de 0 à 1
function scrollZoomImage() {
	zoomImages.forEach((image) => {
		if (isImageVisible(image)) {
			image.style.opacity = "1";
			image.style.visibility = "visible";
			image.style.transform = "scale(1)";
			image.style.transition =
				"opacity 3s ease, visibility 3s ease, transform 3s ease";
		}
	});
}

// gerer l'événement de scroll et le zoom de 0 à 1
window.addEventListener("scroll", scrollZoomImage);

// Appel de la fonction scrollZoomImage
scrollZoomImage();

// apparition de la mini-description du personnage de la carte
const descriptions = document.querySelectorAll(".description");
descriptions.forEach((description) => {
	description.addEventListener("mouseenter", (e) => {
		console.log(`id description : ${e.target.id}`);
		const id = e.target.id;
		$(`#${id} .etiquette`).css("visibility", "visible");
	});

	$(".description").on("mouseleave", (e) => {
		console.log(`id description : ${e.target.id}`);
		const id = e.target.id;
		$(`#${id} .etiquette`).css("visibility", "hidden");
	});
});

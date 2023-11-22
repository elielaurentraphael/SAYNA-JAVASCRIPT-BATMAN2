// CANVAS ANIMATION:

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// on met l'image dans le canvas et, c'est le canvas qu'on bouge avec la souris
canvas.style.position = "absolute";

// on écoute le mouvement de la souris et, on récupère ses coordonnées
window.addEventListener("mousemove", canvasPos);

// position de la souris (e.pageX, e.pageY)
// position du "canvas" contenant l'image "chauveSouris" (e.pageX + 2, e.pageY + 2)
// (+2 en x et +2 en y) pour que le canvas ne masque pas la "souris"
function canvasPos(e) {
	canvas.style.top = e.pageY + 5 + "px";
	canvas.style.left = e.pageX + 5 + "px";
}

// on reduit les dimensions du canvas
canvas.style.width = "4vw";
canvas.style.height = "2vw";

// Crée une image chauveSouris avec la classe "Image"
let chauveSouris = new Image();

chauveSouris.onload = function () {
	// on dessine (une fois pour toute) le "chauveSouris" et, on adapte ses dimensions aux dimensions du canvas
	// on n'a pas besoin d'effacer le canvas à chaque mouvement de la souris car les coordonnées (0, 0) du "chauveSouris" sur le canvas ne changent pas (c'est le canvas qui bouge avec la souris et, le dessin du "chauveSouris" est immobile sur le canvas).
	ctx.drawImage(chauveSouris, 0, 0, 300, 150);
};

// chemin de la source de l'image chauveSouris
chauveSouris.src = "./Assets/logos/logo_bat_flèche_2.png";

// SCROLLING PROGRESSIF COMMANDE PAR LES BOUTONS LATERAUX

$(document).ready(function () {
	$(".jsScroll").on("click", function () {
		// Au clic sur un élément (#flecheHaut ou #flecheBas), on scrolle vers la Page cible
		const page = $(this).attr("href");
		// Durée de l'animation (en ms)
		const speed = 5500;
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

// QUAND LA SOURIS SURVOLE LA CARTE, LA MINIE-DESCRIPTION DU PERSONNAGE APPARUE

const descriptions = document.querySelectorAll(".description");
descriptions.forEach((description) => {
	description.addEventListener("mouseenter", (e) => {
		const id = e.target.id;
		//$("#six").css("z-index", "1");
		$(`#${id} .etiquette`).css({ visibility: "visible", opacity: "1" });
		$(`#${id} .avatar`).css({ visibility: "visible", opacity: "1" });
		$(`#${id} .text`).css({ visibility: "visible", opacity: "1" });
	});

	description.addEventListener("mouseleave", (e) => {
		const id = e.target.id;
		$(`#${id} .etiquette`).css({ visibility: "hidden", opacity: "0" });
		$(`#${id} .avatar`).css({ visibility: "hidden", opacity: "0" });
		$(`#${id} .text`).css({ visibility: "hidden", opacity: "0" });
	});
});

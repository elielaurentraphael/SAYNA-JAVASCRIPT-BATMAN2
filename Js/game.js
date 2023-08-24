/*
$(".btn1").click(function () {
	console.log("OK !");
	$(".quiz").hide();
});

$(".btn2").click(function () {
	console.log("OK !");
	$(".quiz").show();
});

$(".btn3").click(function () {
	console.log("OK !");
	$(".startQuiz").hide();
	$(".flecheDown.down").hide();
});

$(".btn4").click(function () {
	console.log("OK !");
	$(".startQuiz").show();
	$(".flecheDown.down").show();
});

$(document).ready(function () {
	$(window).scroll(function () {
		let scroll = $(window).scrollTop();
		$(".social-lateral").css("top", scroll + "px");
		console.log(scroll);
	});
});

$(document).ready(function () {
	// vos scripts
});
*/

/*setTimeout(
	$(document).ready(function () {
		let scroll = $(window).scrollTop();
		$(".social-lateral").css("top", 0 + "px");
	}),
	1000
);
window.onscroll = function (event) {
	console.log(event);
};
*/
$(".next").click(function () {
	$(".startQuiz, .flecheDown.down").fadeOut();
	$(".quiz").fadeIn();
	$(".next").text("question suivante");
});

var lastHash = "#1";
var lightboxOpen = false;

function getWindowSize() {
	var viewPortWidth;
	var viewPortHeight;

	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}

		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		else if (typeof document.documentElement != 'undefined'
		&& typeof document.documentElement.clientWidth !=
		'undefined' && document.documentElement.clientWidth != 0) {
		viewPortWidth = document.documentElement.clientWidth,
		viewPortHeight = document.documentElement.clientHeight
	}

	// older versions of IE
	else {
		viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
		viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
	}

	return [viewPortWidth, viewPortHeight];
}

function setHeaderFooter(){
	[viewPortWidth, viewPortHeight] = getWindowSize();

	var v = viewPortHeight;
	var h = document.getElementById('bodyContent').clientHeight;
	h -= v;
	h = Math.max(0, h);

	$("#navbar").css("top", Math.min(0, (h) - $(this).scrollTop()));
	$("#mainMenu").css("top", Math.min(0, (h) - $(this).scrollTop()));
	$(".floatingFooter").css("bottom", Math.max(0, $(this).scrollTop() - (h)));
}

// Detect Navbar Height
function setNavbarSpacer() {
	var h = document.getElementById('navbar').clientHeight;
	h += "px";

	var elements = document.getElementsByClassName('navbarSpacer');

	for(i = 0; i < elements.length; i++) {
		elements[i].style.height = h;
	}
}

// Scroll to specific section
function scroll(multiplier) {
	
	[viewPortWidth, viewPortHeight] = getWindowSize();
	viewPortHeight = viewPortHeight * multiplier;

	closeMenu();
	showLightbox(null);

	$('html, body').animate({scrollTop: viewPortHeight}, 1000, function(){
		//callback
	});
}

// Toggle Lightboxes
function openLightbox(name){
	if (name) {
		name = "#" + name + "Lightbox";

		$("#lightboxBack").fadeIn(500);
		$(name).show();
		$(name).animate({
			marginTop: "20vh",
			marginBottom: "20vh",
			height: "60vh"
		}, 500, function () {
			lightboxOpen = true;
		});
	}
}

function showLightbox(newLightbox){
	if (lightboxOpen) {
		$("#lightboxBack").fadeOut(500);
		$(".lightbox").animate({
			marginTop: "50vh",
			marginBottom: "50vh",
			height: "0px"
		}, 500, function () {
			$(".lightbox").hide();
			lightboxOpen = false;
			openLightbox(newLightbox);
		});
	}
	else{
		openLightbox(newLightbox);
	}
}

// Toggle Main Menu
function openMenu() {
	$("#navbarBack").slideDown(500);
	$("#mainMenu").slideDown(500);
	$("#menuOpen").hide();
	$("#menuClose").show();
}

function closeMenu() {
	$("#navbarBack").slideUp(500);
	$("#mainMenu").slideUp(500);
	$("#menuClose").hide();
	$("#menuOpen").show();
}

$(document).click(function (event) {
	if (!$(event.target).closest('#mainMenu').length) {
		if ($('#mainMenu').is(":visible")) {
			closeMenu();
		}
	}
})

// Change displayed content based on hash
$(window).hashchange(function () {
	// Alerts every time the hash changes
	var hash = window.location.hash;

	if (hash) {
		// Hash found
		closeMenu();
		showLightbox(null);

		var section = hash.substr(1);

		if (!isNaN(section)) {
			section -= 1;
		}
		else {
			section = 0;
		}

		var scrollDelay = 0;

		$(this).delay(scrollDelay).queue(function () {
			scroll(section);
			$(this).dequeue();
		});
	}
	else {
		// No hash found
		lastHash = "#1";
		closeMenu();
		window.location.hash = "#1";
	}
});

$(window).scroll(function () {
	setHeaderFooter();
});

$(document).ready(function () {
	setNavbarSpacer();
	setHeaderFooter();

	if (window.location.hash && window.location.hash != "#1") {
		$(window).delay(500).hashchange();
	}

	$('.popup-youtube').magnificPopup({ type: 'iframe' });
});
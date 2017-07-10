var lightboxOpen = false;

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

// Scroll to specific section
function scroll(pageid) {
	closeMenu();
	showLightbox(null);
    
    $('html, body').animate({ scrollTop: $(pageid).offset().top }, 1000);
}

function scrollHash() {
	var hash = window.location.hash;

	if (hash) {
		// Hash found
		closeMenu();
		showLightbox(null);

		var section = hash.substr(1);

		if (isNaN(section)) {
			section = '#s1';
		}
        else {
            section = '#s'+section;
        }

		scroll(section);
	}
	else {
		// No hash found
		closeMenu();
	}
}

// Change displayed content based on hash
$(window).hashchange(function () {
    // Alerts every time the hash changes
	scrollHash();
});

window.onload = function() { // this will be run when the whole page is loaded
    if (window.location.hash) {
		scrollHash();
	}

	$('.popup-youtube').magnificPopup({ type: 'iframe' });
};

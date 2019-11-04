
// @codekit-prepend quiet "libs/jquery.fitvids.js";
// @codekit-prepend quiet "libs/nprogress.js";

jQuery(function($) {

	var body = $('body');
	var html = $('html');
	var viewport = $(window);

	//Check to see if the window is top if not then display button
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $('.back-to-top').fadeIn();
    } else {
    $('.back-to-top').fadeOut();
}
});

// Page scrolling script
	$('a[href*="#"]:not([href="#"], [title])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	//Menu
	function menu() {
		html.toggleClass('menu-active');
	};

	$('#menu').on({
		'click': function() {
			menu();
		}
	});

	$('.menu-button').on({
		'click': function() {
			menu();
		}
	});

	$('.hidden-close').on({
		'click': function() {
			menu();
		}
	});

	/* ==========================================================================
	   Parallax cover
	   ========================================================================== */

	var cover = $('.cover');
	var coverPosition = 0;

	function prlx() {
		if(cover.length >= 1) {
			var windowPosition = viewport.scrollTop();
			(windowPosition > 0) ? coverPosition = Math.floor(windowPosition * 0.25) : coverPosition = 0;
			cover.css({
				'-webkit-transform' : 'translate3d(0, ' + coverPosition + 'px, 0)',
				'transform' : 'translate3d(0, ' + coverPosition + 'px, 0)'
			});
			(viewport.scrollTop() < cover.height()) ? html.addClass('cover-active') : html.removeClass('cover-active');
		}
	}
	prlx();

	viewport.on({
		'scroll': function() {
			prlx();
		},
		'resize': function() {
			prlx();
		},
		'orientationchange': function() {
			prlx();
		}
	});

	/* ==========================================================================
	   Reading Progress
	   ========================================================================== */

	var post = $('.post-content');

	function readingProgress() {
		if(post.length >= 1) {
			var postBottom = post.offset().top + post.height();
			var windowBottom = viewport.scrollTop() + viewport.height();
			var progress = 100 - (((postBottom - windowBottom) / (postBottom - viewport.height())) * 100);
			$('.progress-bar').css('width', progress + '%');
			(progress > 100) ? $('.progress-container').addClass('ready') : $('.progress-container').removeClass('ready');
		}
	}
	readingProgress();

	viewport.on({
		'scroll': function() {
			readingProgress();
		},
		'resize': function() {
			readingProgress();
		},
		'orientationchange': function() {
			readingProgress();
		}
	});

	/* ==========================================================================
	   Gallery
	   ========================================================================== */

	function gallery() {
		var images = document.querySelectorAll('.kg-gallery-image img');
		images.forEach(function (image) {
			var container = image.closest('.kg-gallery-image');
			var width = image.attributes.width.value;
			var height = image.attributes.height.value;
			var ratio = width / height;
			container.style.flex = ratio + ' 1 0%';
		});
	}
	gallery();

	/* ==========================================================================
	   Style code blocks with highlight and numbered lines
	   ========================================================================== */

	function codestyling() {
		$('pre code').each(function(i, e) {
			hljs.highlightBlock(e);

			if(!$(this).hasClass('language-text')) {
				var code = $(this);
				var lines = code.html().split(/\n/).length;
				var numbers = [];
				for (i = 1; i < lines; i++) {
					numbers += '<span class="line">' + i + '</span>';
				}
				code.parent().append('<div class="lines">' + numbers + '</div>');
			}
		});
	}
	codestyling();

	/* ==========================================================================
	   Responsive Videos with Fitvids
	   ========================================================================== */

	function video() {
		$('#wrapper').fitVids();
	}
	video();

	/* ==========================================================================
	   Initialize and load Disqus
	   ========================================================================== */

	if (typeof disqus === 'undefined') {
		$('.post-comments').css({
			'display' : 'none'
		});
	} else {
		$('#show-disqus').on('click', function() {
			$.ajax({
				type: "GET",
				url: "//" + disqus + ".disqus.com/embed.js",
				dataType: "script",
				cache: true
			});
			$(this).parent().addClass('activated');
		});
	}
});
//Subscribe form
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAi0HZMbjVLKrfYsCdj3To2osTNCBrg6z4",
    authDomain: "subscribe-8cae0.firebaseapp.com",
    databaseURL: "https://subscribe-8cae0.firebaseio.com",
    projectId: "subscribe-8cae0",
    storageBucket: "",
    messagingSenderId: "255887982226",
    appId: "1:255887982226:web:723e7e885efbc23b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference messages collection
var db = firebase.firestore();

var form = document.querySelector('#md-form');


$('.input').on("focus blur", function() {

  if ($(this).val().length > 0 || $('.input').is(':focus')) {
    $(this).siblings().addClass('active');
    $(this).parent().addClass('active');

  } else {
    $(this).siblings().removeClass('active').addClass('not');
    $(this).parent().removeClass('active').addClass('not');
  }

  if ($(this).val().length < 2 && $('.input').is(':focus') != true && $(this).is(':invalid') || $(this).is(':invalid') && $('.input').is(':focus') != true) {
    $(this).parent().addClass('invalid');
    $(this).siblings().addClass('invalid');
  } else {
    $(this).parent().removeClass('invalid');
    $(this).siblings().removeClass('invalid');
  }

  if ($(this).val().length > 0 && $(this).is(':valid') && $('.input').is(':focus') != true) {
    $(this).parent().addClass('valid');
    $(this).siblings().addClass('valid');
  } else {
    $(this).parent().removeClass('valid');
    $(this).siblings().removeClass('valid');
  }

});

$('#d').change(enableBtn);
$('.input').blur(enableBtn);

function enableBtn() {
  if ($('#d').is(':checked') == false || $('.input').parent('.input-wrap').hasClass('invalid') == true || $('.input').val().length < 2) {
    $("#confirm").prop("disabled", true);
  } else {
    $("#confirm").prop("disabled", false);
  }
}
enableBtn();

$('#confirm').click(function() {
  $('form').submit(function(event) {
    $('.card').addClass('end');
    $('.ending').addClass('showed');
    event.preventDefault();
   db.collection('users').add({
    name: form.name.value,
        email: form.email.value,
        message: form.message.value
});
 })
 });
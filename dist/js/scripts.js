$(document).ready(function () {

	// Запрет перехода по ссылкам с хэшем
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Мобильное меню
	function myMenu(menu) {
		if (menu.length) {
			menu.each(function () {

				var $this = $(this),
						menuBtn = $this.find('#menu-btn'),
						over = $this.find('#menu-over'),
						close = $this.find('#menu-close'),
						body = $('body'),
						scrollbarWidth;
				menuBtn.on('click', toggleOpenMenu);
				over.on('click', menuClose);
				close.on('click', menuClose);
				function menuOpen() { // Открывание меню
					// body.addClass('lock').css('padding-right', scrollbarWidth);
					$this.addClass('open');
					menuBtn.addClass('is-active');
				}
				function menuClose() { // Закрывание меню
					// body.removeClass('lock').css('padding-right', 0);
					$this.removeClass('open');
					menuBtn.removeClass('is-active');
				}
				function scrollbarWidthCalc() { // Вычисление ширины скролла
					var documentWidth = parseInt(document.documentElement.clientWidth),
							windowsWidth = parseInt(window.innerWidth);
							scrollbarWidth = windowsWidth - documentWidth;
				}
				function toggleOpenMenu() { // Открывание/закрывание меню
					if ($this.hasClass('open')) {
						menuClose();
					}else {
						menuOpen();
					}
				}
				scrollbarWidthCalc();
				$(window).resize(scrollbarWidthCalc);
			})
		};
	};
	myMenu($('.js-menu'));

	// Аккордеон
	function accordion() {
		if ($('.accordion').length) {
			$('.accordion').each(function () {
				var accordion = $(this),
					trigger = accordion.find('.accordion__trigger'),
					time = 300;
				trigger.on('click', function () {
					var $thisTrigger = $(this),
						data = $thisTrigger.data('trigger');
					if (!$thisTrigger.hasClass('active')) {
						$thisTrigger.addClass('active');
						accordion.find('#' + data).stop().slideDown(
							time,
							function () {
								$(this).addClass('open')
							}
						);
					} else {
						$thisTrigger.removeClass('active');
						accordion.find('#' + data).stop().slideUp(
							time,
							function () {
								$(this).removeClass('open')
							}
						);
					}
				})
			})
		}
	}
	accordion();

	// Scrollspy
	$('body').each(function () {
	  var $spy = $(this).scrollspy('refresh')
	});

	// Massonry
	$('.gallery__images').masonry({
		// options
		itemSelector: '.gallery__img',
		columnWidth: '.grid-sizer',
		percentPosition: true,
	});

	// Magnific Popup
	$('.gallery__img').magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function (openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});

});
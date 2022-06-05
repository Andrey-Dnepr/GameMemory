$(document).ready(function(){
    var header = $('.header');
	const mouseTarget = document.getElementById('header_space-false'), //получаем элемент по ID
		mouseTargetOut = document.getElementById('header_space-true'), //получаем элемент по ID
		logoMain = document.querySelector('.header__img_main'),
      	logoUa = document.querySelector('.header__img_ua');

	// следим, когда мышка попадет в определенную зону и убираем класс out, тоесть появляется МЕНЮ
	mouseTarget.addEventListener('mouseenter', function() {
		header.removeClass('out');
	});

	// следим, когда мышка покидает определенную зону и при этом, экран должен быть прокручен на 300 ед. (для того чтоб меню не убиралось на стартовой странице) и добавляем класс out, тоесть МЕНЮ исчезает. Иначе меню остается на месте.
	mouseTargetOut.addEventListener('mouseleave', function() {
		if ( $(window).scrollTop() > 300 ) {
			header.addClass('out');
		}
	});

	logoMain.addEventListener('mouseenter', () => {
		logoMain.classList.add('active');
		logoUa.classList.add('active');
	
	});
	
	logoMain.addEventListener('mouseleave', () => {
		logoMain.classList.remove('active');
		logoUa.classList.remove('active');
	});

	//Если экран прокручен на 300 ед., то меню исчезает
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop();
	
		if ( scrolled > 300 ) {
			header.addClass('out');
		} else {
			header.removeClass('out');
		}

	});

	//Когда экран прокручен на 1200 ед. появляется стрелка с быстрым возвратом на верх
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1200) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}

	});

	//медленный скроллинг на верх
	new WOW().init();

	
	//добавляем класс (задний фон) к активному языку и удаляем класс у не активного
	$('div.header__lang').on('click', 'div:not(.header__lang__item_active)', function() {
        $(this).addClass('header__lang__item_active').siblings().removeClass('header__lang__item_active');
      });

});
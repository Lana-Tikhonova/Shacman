$(document).ready(function () {
    //слайдер на главной
    var swiperWallet = new Swiper(".slider_block .swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        breakpoints: {
            769: {
                spaceBetween: 45,
            },
        },
    });

    $('.mobile_menu_btn').on('click', function () {
        $('.mobile_menu').toggleClass('active');
    });
    $('.mobile_menu_close').on('click', function () {
        $('.mobile_menu').removeClass('active');
    });

    //картинка на весь экран
    $('[data-fancybox="gallery"]').fancybox({
        thumbs: {
            loop: true,
            autoFocus: false,
        },
        mobile: {
            clickSlide: "close"
        },
    });

    // слайдер в карточке продукта
    //маленькие слайды
    var swiperShopOptionsTwo = {
        slidesPerView: 3,
        spaceBetween: 10,
        grabCursor: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            769: {
                spaceBetween: 20,
            },
        },
    };

    let swiperShopTwo = new Swiper(".gallery_small", swiperShopOptionsTwo);

    //большой слайд
    var swiperShopOptions = {
        slidesPerView: 1,
        speed: 500,
        spaceBetween: 10,
        grabCursor: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        thumbs: {
            swiper: swiperShopTwo,
        },
        navigation: {
            nextEl: '.gallery_big .swiper-button-next',
            prevEl: '.gallery_big .swiper-button-prev',
        },
    };

    let swiperShop = new Swiper(".gallery_big", swiperShopOptions);

    //tabs
    $('.tabs_wrapper').each(function (e) {
        let tabsItem = $(this).find('.tabs_content .tabs_content_item');
        tabsItem.hide().filter(':first').show();
        $(this).find('.tabs_list .tabs_item').filter(':first').addClass('active')
    });

    // Клики по вкладкам
    $('.tabs_item').click(function (e) {
        e.preventDefault();
        let tabsItem = $(this).parents('.tabs_wrapper').find('.tabs_content .tabs_content_item');
        tabsItem.hide();
        tabsItem.filter(this.hash).show();
        $(this).parents('.tabs_wrapper').find('.tabs_list .tabs_item').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    function fixMenu(e) {
        if ($(this).scrollTop() > 10) {
            $('.mobile_menu_close').addClass('fix');
            $('.mobile_menu_btn').addClass('fix');
        } else {
            $('.mobile_menu_close').removeClass('fix');
            $('.mobile_menu_btn').removeClass('fix');
        }
    }
    fixMenu();

    $(window).scroll(function (e) {
        e.preventDefault();
        fixMenu();
    });


});
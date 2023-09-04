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

    const phoneInputs = document.querySelectorAll('.form_input[name="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '+{7}(000)000-00-00'
        })
    })

    function removeErr(e) {
        e.target.closest('.form_input_group').classList.remove('error');
    }
    const forms = document.querySelectorAll('.validate_form');
    forms.forEach(form => {
        const userName = form.querySelector('.form_input[name="name"]');
        const userPhone = form.querySelector('.form_input[name="tel"]');
        userName.addEventListener('input', removeErr);
        userPhone.addEventListener('input', removeErr);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (userName.value.trim().length < 1) {
                userName.closest('.form_input_group').classList.add('error')
            }
            if (userPhone.value.replace(/\D/g, '').length < 11) {
                userPhone.closest('.form_input_group').classList.add('error')
            }
            const formErrors = form.querySelector('.error');
            if (formErrors) return;
            //backend ajax
            console.log('Send');
        });
    });




});
window.onload = function () {

    let cost = document.getElementById("cost"),
        prepaid = document.getElementById("prepaid"),
        calcInput = document.getElementsByClassName("inputfield"),
        term = document.getElementById("term"),
        payment = document.getElementById("payment"),
        paymentResult,
        monthPayment = document.getElementById('month-payment'),
        stavka = 0.006;

    cost.value = 1000000;
    prepaid.value = 25;
    term.value = 12;

    payment.textContent = Math.floor(cost.value / 100 * prepaid.value);
    payment.textContent = payment.textContent.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

    paymentResult = payment.textContent.replace(/\s+/g, '');

    monthPayment.textContent = Math.floor(
        ((cost.value - paymentResult) / term.value) * 1.2
    );
    monthPayment.textContent = monthPayment.textContent.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");


    for (let i = 0; i < calcInput.length; i++) {
        calcInput[i].onchange = function () {

            if (cost.value > 15000000) cost.value = 15000000;
            if (cost.value < 300000) cost.value = 300000;
            if (prepaid.value < 5) prepaid.value = 5;
            if (prepaid.value > 50) prepaid.value = 50;
            if (term.value < 12) term.value = 12;
            if (term.value > 50) term.value = 50;

            payment.textContent = Math.floor(cost.value / 100 * prepaid.value);
            payment.textContent = payment.textContent.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

            paymentResult = payment.textContent.replace(/\s+/g, '');
            paymentResult = Number(paymentResult);

            monthPayment.textContent = Math.floor(
                ((cost.value - paymentResult) / term.value) * 1.2
            );
            monthPayment.textContent = monthPayment.textContent.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

        }
    }
};
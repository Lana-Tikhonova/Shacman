const calculator = () => {
    let cost = document.getElementById("cost"),
        prepaid = document.getElementById("prepaid"),
        calcInput = document.getElementsByClassName("inputfield"),
        term = document.getElementById("term"),
        payment = document.getElementById("payment"),
        paymentResult,
        monthPayment = document.getElementById('month-payment'),
        stavka = 0.006;

    cost.value = cost.value ? cost.value : 1000000;
    prepaid.value = prepaid.value ? prepaid.value : 25;
    term.value = term.value ? term.value : 12;

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

            document.getElementById("payment-id").value = payment.textContent
            document.getElementById('month-payment-id').value = monthPayment.textContent
        }
    }
}

$(document).ready(function () {
    //слайдер на главной

    var swiperWallet = new Swiper(".slider_block .swiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".arrow-right",
            prevEl: ".arrow-left"
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        on: {
            progress: function (swiper) {
                if (swiper.isEnd) {
                    $('.slider_block .swiper').addClass('slider_end')
                } else {
                    $('.slider_block .swiper').removeClass('slider_end')
                }
                if (swiper.isBeginning) {
                    $('.slider_block .swiper').removeClass('slider_move')
                } else {
                    $('.slider_block .swiper').addClass('slider_move')
                }
            },
        },
    });

    function hederFix(e) {
        if ($(window).width() > 1101) {
            let hederHeight = $('.header').outerHeight();
            $('.home_block').css('paddingTop', `${hederHeight}px`);
        }
    }
    hederFix();
    $(window).resize(function () {
        hederFix();
    });

    $(window).scroll(function (e) {
        e.preventDefault();
        if ($(this).scrollTop() > 10) {
            $('.header').addClass('fix')
        } else {
            $('.header').removeClass('fix')
        }
    })

    $('.mobile_menu_btn').on('click', function () {
        $('.mobile_menu').toggleClass('active');
    });
    $('.mobile_menu_close').on('click', function () {
        $('.mobile_menu').removeClass('active');
    });

    $('.catalog_filter_mobile').on('click', function () {
        $('.catalog_filter').toggleClass('active');
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
    var swiperShopOptionsSmall = {
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

    let swiperShopSmall = new Swiper(".gallery_small_shop", swiperShopOptionsSmall);

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
            swiper: swiperShopSmall,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    };

    let swiperShop = new Swiper(".gallery_big_shop", swiperShopOptions);


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
        $grid.masonry('layout');
        $(this).parents('.tabs_wrapper').find('.tabs_list .tabs_item').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    // таблицы подстраиваются друг под друга
    var $grid = $('.tabs_content_table').masonry({
        // options
        itemSelector: 'table',
        // columnWidth: 900
    });

    // фикс меню 
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

    const form = () => {
        // маскадля телефона
        const phoneInputs = document.querySelectorAll('.form_input[name="tel"]');
        phoneInputs.forEach(input => {
            IMask(input, {
                mask: '+{7}(000)000-00-00'
            })
        })
        // валидация
        const forms = document.querySelectorAll('.validate_form');
        forms.forEach(form => {
            const userName = form.querySelector('.form_input[name="name"]');
            const userPhone = form.querySelector('.form_input[name="tel"]');
            const textArea = form.querySelector('.form_textarea');
            userName.addEventListener('input', removeErr);
            if (userPhone) {
                userPhone.addEventListener('input', removeErr);
            }
            if (textArea) {
                textArea.addEventListener('input', removeErr);
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (userName.value.trim().length < 1) {
                    userName.closest('.form_input_group').classList.add('error');
                }
                if (textArea) {
                    if (textArea.value.trim().length < 1) {
                        textArea.closest('.form_input_group').classList.add('error');
                    }
                }
                if (userPhone) {
                    if (userPhone.value.replace(/\D/g, '').length < 11) {
                        userPhone.closest('.form_input_group').classList.add('error');
                    }
                }
                const formErrors = form.querySelector('.error');
                if (formErrors) return;
                //backend ajax
                //send-email
                let response = await fetch('/api/send-calculator', {
                    method: 'POST',
                    body: new FormData(form)
                });


                let result = await response.json();

                if (result.success) {
                    form.innerHTML = '<div  class="alert alert-opacity">Ваше сообщение успешно оправлено</div>';

                } else {
                    form.innerHTML = '<div  class="alert alert-error">Ошибка отправки сообщения</div>';
                }
                setTimeout(() => {
                    selectedModal.classList.add('hide');
                }, 2000)
                return false;
                console.log('Send');
            });
        });
    }


    form()


    function removeErr(e) {
        e.target.closest('.form_input_group').classList.remove('error');
    }


    // звездочки в отзывах
    $('.review_rating span').hover(
        function () {
            var n = $(this).data('n');
            for (var i = 1; i <= n; i++) {
                $('.review_rating span[data-n="' + i + '"]').addClass('hover');
            }
        },
        function () {
            $('.review_rating span').removeClass('hover');
        }
    );
    $('.review_rating span').click(function () {
        $('.review_rating span').removeClass('active');
        var n = $(this).data('n');
        for (var i = 1; i <= n; i++) {
            $('.review_rating span[data-n="' + i + '"]').addClass('active');
        }
        $('.review_rating input').val(n);
    });


    // открытие модаки 
    // можно использовать и для других модалок, не только для быстрого просмотра
    // нужно только поменять значени в data-modal и data-open-modal
    const body = document.querySelector('body');
    let getScrollWidth = () => window.innerWidth - document.documentElement.offsetWidth;
    let browserScrollWidth = getScrollWidth();

    document.addEventListener('click', async (e) => {
        const target = e.target;
        let response = {}
        let result = ''
        let targetId;
        let selectedModal;
        if (target.closest('[data-open-modal]')) {
            e.preventDefault();
            document.querySelector(".modal_body").innerHTML = "";
            switch (target.dataset.type) {
                case 'order':

                    response = await fetch('/api/get-form-order&link=' + target.dataset.link, {
                        method: 'POST',

                    });
                    targetId = target.closest('[data-open-modal]').dataset.openModal;
                    selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
                    selectedModal.classList.add('show');

                    result = await response.text();
                    document.querySelector(".modal_body").innerHTML = result;
                    // calculator();
                    form();
                    break;
                case 'calc':
                    response = await fetch('/api/get-form-calc&link=' + target.dataset.link, {
                        method: 'POST',

                    });
                    targetId = target.closest('[data-open-modal]').dataset.openModal;
                    selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
                    selectedModal.classList.add('show');



                    result = await response.text();
                    document.querySelector(".modal_body").innerHTML = result;

                    form();
                    calculator();
                    break;
                default:

                    response = await fetch('/api/get-fast&link=' + target.dataset.link, {
                        method: 'POST',
                    });



                    result = await response.text();
                    document.querySelector(".modal_body").innerHTML = result;

                    targetId = target.closest('[data-open-modal]').dataset.openModal;
                    selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
                    selectedModal.classList.add('show');

                    body.classList.add('locked');
                    if (getScrollWidth() == 0) {
                        body.style.paddingRight = `${browserScrollWidth}px`;
                    }
                    // инитю слайдер при открытии модалки
                    // слайдер в быстром просмотре
                    //маленькие слайды
                    var swiperViewingOptionsSmall = {
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

                    let swiperViewingSmall = new Swiper(".gallery_small_viewing", swiperViewingOptionsSmall);

                    //большой слайд
                    var swiperViewingOptions = {
                        slidesPerView: 1,
                        speed: 500,
                        spaceBetween: 10,
                        grabCursor: true,
                        watchOverflow: true,
                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,
                        mousewheelControl: true,
                        thumbs: {
                            swiper: swiperViewingSmall,
                        },
                    };

                    let swiperViewing = new Swiper(".gallery_big_viewing", swiperViewingOptions);
            }

        }
        if (target.closest('[data-modal-close]')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            modalOpen.classList.remove('show');
            body.classList.remove('locked');
            body.style.paddingRight = ``;
        }
        if (target.closest('.modal') && !target.closest('.modal-content')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            modalOpen.classList.remove('show');
            body.classList.remove('locked');
            body.style.paddingRight = ``;
        }
    });
});
// калькулятор
window.onload = function () {
    if (document.getElementsByClassName("home_calc").length) {
        calculator();
    }
};
$(document).ready(function () {
    $(document).on('click', '.product-count', function () {
        let $btn = $(this),
            count = $btn.data('count'),
            $input = $btn.closest('.quanity').find('.quanity_input'),
            val = parseInt($input.val());
        val += count;
        if (val <= 0) {
            val = $btn.hasClass('-one') ? 1 : 0;
        }
        $input.attr('value', val);
    });

    $(document).on('click', '.autopart_select', function () {
        $(this).toggleClass('open')
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(".autopart_select").length) {
            $('.autopart_select').removeClass('open');
        }
    });

    $(document).on('click', '.autopart_filter_close', function () {
        $('.autopart_block_filter').removeClass('open')
    });
    $(document).on('click', '.autopart_filter_btn', function () {
        $('.autopart_block_filter').addClass('open')
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(".autopart_filter,.autopart_filter_btn").length) {
            $('.autopart_block_filter').removeClass('open');
        }
    });

    //Диапазон цен
    const slider = document.querySelectorAll('.range_price_slider');

    if (slider) {
        $need_use_js_form_filter_change = 0;
        for (let index = 0; index < slider.length; index++) {
            const element = slider[index];
            let rangeSlider = $('.range_price_slider').eq(index).closest('.range_price').find('.range_price_block')
            let inputFrom = rangeSlider.find('.price_from'),
                inputTo = rangeSlider.find('.price_to'),
                inputHidden = rangeSlider.find('.input_range'),
                inputMin = inputFrom.data('min'),
                inputMax = inputTo.data('max');
            inputFrom.addClass('js_from_' + index);
            inputTo.addClass('js_to_' + index);

            noUiSlider.create(element, {
                start: [inputFrom.data('value'), inputTo.data('value')],
                connect: true,
                range: {
                    'min': inputMin,
                    'max': inputMax
                },
                step: 1,
                format: {
                    from: function (value) {
                        return parseInt(value);
                    },
                    to: function (value) {
                        return parseInt(value);
                    }
                }
            });

            element.noUiSlider.on('update', function (values, handle) {
                let $this_val_min = values[0]
                let $this_val_max = values[1]

                inputFrom.text($this_val_min);
                inputTo.text($this_val_max);
                inputHidden.val($this_val_min + '-' + $this_val_max);
            });

            $(document).on('change', '.js_from_' + index + ', .js_to_' + index, function () {
                let $from = $('.js_from_' + index).text();
                let $to = $('.js_to_' + index).text();
                element.noUiSlider.set([$from, $to]);
            })
        }
        $need_use_js_form_filter_change = 1;
    }

    //слайдер на стр запчастей (аналоги)
    var swiperWallet = new Swiper(".analogue_slider .swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".arrow-right",
            prevEl: ".arrow-left"
        },

        // breakpoints: {
        //     769: {
        //         spaceBetween: 45,
        //     },
        // },
    });

})
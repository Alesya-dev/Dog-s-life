//Прайс-лист. Angular
var app = angular.module('lpApp', []);
app.controller('lpPriceCtrl', function ($scope, $http, $timeout) {

    //    $timeout(function () {
    $http.get('price.json').then(function (res) {
        $scope.prices = res.data;
        console.log($scope.prices)
        $scope.calc();
    }).catch(function (err) {
        console.log(err)
        $scope.reqStatus = err.status;
        $scope.reqStatusText = err.statusText;
    });
    //    }, 3000);



    $scope.sortBy = 'name';
    $scope.sortRev = false;

    $scope.sortSet = function (propertyName) {
        if ($scope.sortBy == propertyName) {
            $scope.sortRev = !$scope.sortRev;
        }
        $scope.sortBy = propertyName;
    };

    $scope.calc = function () {
        $scope.prices.forEach(function (price) {
            price.price2 = price.price * (1 - price.discount)
        });
    }

});

//jQuery
(function ($) {
    $(document).ready(function () {
        function lpHeader() {

            if ($(window).scrollTop() == 0) {
                $('header').addClass('top');

            } else {
                $('header.top').removeClass('top');
            }
        }

        lpHeader();
        $(window).on('scroll load', lpHeader);

        //        Плавный скролл к ссылке
        var lpNav = $("header ul");

        lpNav.find('li a').on('click', function (e) {

            var trgtSelector = $(this).attr('href'),
                linkTrgt = $(trgtSelector);
            if (linkTrgt.length > 0) {

                e.preventDefault();

                var offset = linkTrgt.offset().top - 44;

                $("html, body").animate({
                    scrollTop: offset

                }, 750);
            }


            $('#services')
        });


        //        Подсветка пункта меню

        function lpSetNavActive() {
            var curItem = '';
            $('section').each(function () {

                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id');
                }
            });

            var noActiveItem = lpNav.find('li.active').length == 0,
                newActiveRequired = lpNav.find('li.active a').attr('href') !=
                '#' + curItem;

            if (noActiveItem || newActiveRequired) {
                lpNav.find('li.active').removeClass('active');
                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');

            }

        }

        lpSetNavActive();
        $(window).on('scroll load', lpSetNavActive);









        //        Слайдшоу
        //        $(".owl-carousel").owlCarousel();

        $('.dl-slider1').on('changed.owl.carousel initialized.owl.carousel', function (e) {
            var i = e.item.index;
            $('.sl-nav li').removeClass('active');
            $('.sl-nav li').eq(i).addClass('active');
        });

        $(".dl-slider1").owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>']
        });


        $('.sl-nav li').click(function () {
            var i = $(this).index();
            $('.dl-slider1').trigger('to.owl.carousel', i);

        });

        $('.sl-prev').click(function () {
            $('.dl-slider1').trigger('prev.owl.carousel');

        });

        $('.sl-next').click(function () {
            $('.dl-slider1').trigger('next.owl.carousel');

        });
        //Слайдшоу портфолио


        $('.lp-slider2').owlCarousel({
            loop: false,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 5,
                    nav: true
                },
                1000: {
                    items: 10,
                    nav: true,
                    loop: false
                }
            }
        })

        $(".lp-slider2").owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>']
        });

        //2. Вывести в консоль сообщения при возникновении следующих событий: инициализация слайдера, переключение слайда, изменение размера слайдера.

        $('.lp-slider2').on('changed.owl.carousel initialized.owl.carousel', function (e) {
            var i = e.item.index;
            $('.sl-nav li').removeClass('active');
            $('.sl-nav li').eq(i).addClass('active');
            console.log(i);
        });

        //        Табулятор
        $('.lp-services').lpTabs({
            duration: 1000,
            trigger: 'click',
            startIndex: 0
        });

        //        Всплывающие окна.

        $('.lp-mfp-inline').magnificPopup({
            type: 'inline'
        });
        $('.lp-mfp-iframe').magnificPopup({
            type: 'iframe'
        });

        $('.lp-mfp-ajax').magnificPopup({
            type: 'ajax'
        });



        $('.lp-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
        //При нажании на название
        //        $('h2').magnificPopup({
        //            items: [
        //                {
        //                    type: 'iframe',
        //                    src: 'https://www.youtube.com/watch?v=PuBywc6Lnk8'
        //                }, {
        //                    type: 'inline',
        //                    src: '#lp-srv1'
        //                }, {
        //                    type: 'image',
        //                    src: '#slider1'
        //                }
        //            ],
        //            gallery: {
        //                enabled: true
        //            }
        //        });

        //        setTimeout(function () {
        //            $.magnificPopup.open({
        //                items: [
        //                    {
        //                        type: 'inline',
        //                        src: '#lp-srv1'
        //                    }
        //                ],
        //                modal: true
        ////                callbacks: {
        ////                    beforeOpen: function () {
        ////                        alert('Сейчас откроется окно! готовы?')
        ////                    }
        ////                }
        //            });
        //        }, 3000);


        //Задание 3 к занятию 9 
        //        $('.click-clack').click(function () {
        //            $(this).magnificPopup({
        //                items: [
        //                    {
        //                        type: 'iframe',
        //                        src: 'https://www.youtube.com/watch?v=E9nD911UhA0'
        //                    }
        //                }, {
        //                        type: 'inline',
        //                        src: '#lp-srv1'
        //                }, {
        //                        type: 'image',
        //                        src: 'img/slideshow/slide5.jpg'
        //                }
        //            ],
        //                gallery: {
        //                    enabled: true
        //                }
        //            });
        //        });
        $('.click-clack1').click(function () {
            $(this).magnificPopup({
                items: [
                    {
                        type: 'iframe',
                        src: 'https://www.youtube.com/watch?v=ZGIEP0XzK9w'
                    }
            ],
                gallery: {
                    enabled: true
                }
            });
        });
        $('.click-clack2').click(function () {
            $(this).magnificPopup({
                items: [
                    {
                        type: 'iframe',
                        src: 'https://www.youtube.com/watch?v=ylkvxqgniBk'
                    }
            ],
                gallery: {
                    enabled: true
                }
            });
        });
        $('.click-clack3').click(function () {
            $(this).magnificPopup({
                items: [
                    {
                        type: 'iframe',
                        src: 'https://www.youtube.com/watch?v=E9nD911UhA0'
                    }
            ],
                gallery: {
                    enabled: true
                }
            });
        });
        $('.click-clack4').click(function () {
            $(this).magnificPopup({
                items: [
                    {
                        type: 'iframe',
                        src: 'https://www.youtube.com/watch?v=E9nD911UhA0'
                    }
            ],
                gallery: {
                    enabled: true
                }
            });
        });
        $('.click-clack5').click(function () {
            $(this).magnificPopup({
                items: [
                    {
                        type: 'iframe',
                        src: 'https://www.youtube.com/watch?v=E9nD911UhA0'
                    }
            ],
                gallery: {
                    enabled: true
                }
            });
        });

        //Формы обратной связи
        $('#lp-fb2').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: false,
            fbColor: 'red',
            //            fbTheme: false
        });

        //Карта
        $.fn.lpMapInit = function () {
            var lpMapOptions = {
                center: [59.692969, 56.697528],
                //                широта,долгота
                zoom: 16,
                controls: ['fullscreenControl', 'zoomControl']
                //                Чтобы карта выглядела как картинка
                //                        behaviors: []
                //                behaviors: ['drag'] На компьютере
                //                behaviors: ['multiTouch'] На телефоне. Только при двойном касании.
            }

            if (window.innerWidth < 768) {
                lpMapOptions.behaviors = ['multiTouch'];
            } else {
                lpMapOptions.behaviors = ['drag'];
            }

            var lpMap = new ymaps.Map('lp-map', lpMapOptions);

            var lpPlacemark = new ymaps.Placemark(lpMapOptions.center, {
                hintContent: 'Жизнь собаки',
                balloonContentHeader: 'Жизнь собаки',
                balloonContentBody: 'питомник',
                balloonContentFooter: 'ул. Розы Землячки 6'
            });

            lpMap.geoObjects.add(lpPlacemark);

        };

    });
})(jQuery);

(function ($) {

    $.fn.lpTabs = function (userParams) {
        
        defaultParams={
            duration:1000,
            trigger: 'click',
            startIndex: 1
        }
        
   

        var params = $.extend(defaultParams, userParams)
    
        //        Вернет нам тот же набор объектов
        return $(this).each(function () {
            var tabs = $(this),
                tabsTitlesNames = [];
            tabs.addClass('lp-tabs');
            tabs.children().each(function () {
                tabsTitlesNames.push($(this).attr('title'));
            }).addClass('lp-tab')
            console.log(tabsTitlesNames);
            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');

            var tabsTitles = tabs.find('.lp-tabs-titles'),
                tabsContent = tabs.find('.lp-tabs-content'),
                tabsContentTabs = tabsContent.find('.lp-tab');
            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>');
            });

            var tabsTitlesItems = tabsTitles.find('ul li');

            tabsTitlesItems.eq(params.startIndex).addClass('active');
            tabsContentTabs.eq(params.startIndex).addClass('active').show();
            tabsContent.height(tabsContent.find('.active').outerHeight());

            tabsTitlesItems.on(params.trigger, function () {

                if (!tabs.hasClass('changing')) {
                    tabs.addClass('changing');
                    tabsTitlesItems.removeClass('active');
                    $(this).addClass('active');
                    var curTab = tabsContent.find('.active'),
                        nextTab = tabsContentTabs.eq($(this).index());

                    var curHeight = curTab.outerHeight();

                    nextTab.show();
                    var nextHeight = nextTab.outerHeight();
                    nextTab.hide();
                    if (curHeight < nextHeight) {
                        tabsContent.animate({
                            height: nextHeight
                        }, params.duration / 2)
                    }

                    curTab.fadeOut(params.duration / 2, function () {
                        if (curHeight > nextHeight) {
                            tabsContent.animate({
                                height: nextHeight
                            }, params.duration / 2)
                        }
                        
                        nextTab.fadeIn(params.duration / 2, function(){
                            curTab.removeClass('active');
                            nextTab.addClass('active');
                            tabs.removeClass('changing');
                        });
                    });

                }

            });
            
            
           $(window).on('load resize', function(){
               tabsContent.height(tabsContent.find('.active').outerHeight());
           });
            

        });
    }



})(jQuery);

(function (jQuery) {

    function inputIsFocused(element) {
        var result = false;

        jQuery(element).find('input').each(function () {
            if (jQuery(this).is(":focus")) {
                result = true;
            }
        });

        jQuery(element).find('textarea').each(function () {
            if (jQuery(this).is(":focus")) {
                result = true;
            }
        });

        return result;
    }

    jQuery.fn.fixFitScroll = function (options) {

        var defaultOptions = {
            scrollBottom: true,
            mobileDevice: false
        };

        if (options === undefined) {
            options = {};
        }

        var scrollBottom = options.scrollBottom;
        var mobileDevice = options.mobileDevice;

        if (options.scrollBottom === undefined) {
            scrollBottom = defaultOptions.scrollBottom;
        }

        if (options.mobileDevice === undefined) {
            mobileDevice = defaultOptions.mobileDevice;
        }


        return this.each(function () {

            var $this = this;

            function windowResized(){
                var wrapperFitsWindow =
                    (jQuery($this).outerHeight() + parseInt(jQuery($this).css('bottom'))) <= jQuery(window).height();

                if (!wrapperFitsWindow) {
                    jQuery($this).css({
                        height: jQuery(window).height() - parseInt(jQuery($this).css('bottom')),
                        'overflow-y': 'scroll'
                    });

                    if (mobileDevice) {
                        if (scrollBottom && !inputIsFocused($this)) {
                            jQuery($this).scrollTop(jQuery($this).children('div').height());
                        }
                    } else {
                        if (scrollBottom) {
                            jQuery($this).scrollTop(jQuery($this).children('div').height());
                        }
                    }
                } else {
                    jQuery($this).css({
                        height: 'auto',
                        'overflow-y': 'hidden'
                    });
                }
            }

            windowResized();

            new Clay(this, {resize: false}).on('resize', function (size) {

                var wrapperFitsWindow =
                    (jQuery($this).height() + parseInt(jQuery($this).css('bottom'))) <= jQuery(window).height();

                if (!wrapperFitsWindow) {
                    jQuery($this).css({
                        height: jQuery(window).height() - parseInt(jQuery($this).css('bottom')),
                        'overflow-y': 'scroll'
                    });

                    if (mobileDevice) {
                        if (scrollBottom && !inputIsFocused($this)) {
                            jQuery($this).scrollTop(jQuery($this).children('div').height());
                        }
                    } else {
                        if (scrollBottom) {
                            jQuery($this).scrollTop(jQuery($this).children('div').height());
                        }
                    }
                }
            });

            new Clay(jQuery(this).children('div')[0], {resize: false}).on('resize', function (size) {

                var contentFitsWrapper = jQuery($this).children('div').height() <= jQuery($this).height();

                if (contentFitsWrapper) {
                    jQuery($this).css({
                        height: 'auto',
                        'overflow-y': 'hidden'
                    });
                }

                if (mobileDevice) {
                    if (scrollBottom && !inputIsFocused($this)) {
                        jQuery($this).scrollTop(jQuery($this).children('div').height());
                    }
                } else {
                    if (scrollBottom) {
                        jQuery($this).scrollTop(jQuery($this).children('div').height());
                    }
                }
            });

            jQuery(window).resize(function () {
                windowResized();
            });
        });
    };

}(jQuery));
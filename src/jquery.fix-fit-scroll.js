(function (jQuery) {

    jQuery.fn.fixFitScroll = function (options) {

        var defaultOptions = {
            mobileDevice: false
        };

        if (options === undefined) {
            options = {};
        }

        var mobileDevice = options.mobileDevice;

        if (options.mobileDevice === undefined) {
            mobileDevice = defaultOptions.mobileDevice;
        }

        return this.each(function () {

            var $this = this;

            var scrollTop = undefined;

            function windowResized() {

                if (mobileDevice) {
                    scrollTop = jQuery($this).scrollTop();
                }

                var wrapperFitsWindow =
                    (jQuery($this).outerHeight() + parseInt(jQuery($this).css('bottom'))) <= jQuery(window).height();

                if (!wrapperFitsWindow) {

                    jQuery($this).css({
                        height: jQuery(window).height() - parseInt(jQuery($this).css('bottom')),
                        'overflow-y': 'scroll'
                    });

                    if (scrollBottom) {
                        jQuery($this).scrollTop(jQuery($this).children('div').height());
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

                    if (scrollBottom) {
                        jQuery($this).scrollTop(jQuery($this).children('div').height());
                    }

                }
                if (mobileDevice) {
                    jQuery($this).scrollTop(scrollTop);
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

                if (scrollBottom) {
                    jQuery($this).scrollTop(jQuery($this).children('div').height());
                }
            });

            jQuery(window).resize(function () {
                windowResized();
            });
        });
    };

}(jQuery));
(function (jQuery) {

    jQuery.fn.fitFixScroll = function (options) {

        var defaultOptions = {
            scrollBottom: true
        };

        var scrollBottom = options.scrollBottom;

        if (options.scrollBottom === undefined) {
            scrollBottom = defaultOptions.scrollBottom;
        }

        var $this = this;

        return this.each(function () {

            jQuery(this).html('<div>' + jQuery(this).html() + '</div>');

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
                } else {
                    jQuery($this).css({
                        height: 'auto',
                        'overflow-y': 'hidden'
                    });
                }
            });
        });
    };

}(jQuery));
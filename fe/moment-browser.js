(function () {
    var initialize;

    initialize = function (moment) {

        var mbConfig = {
            browserTz: null,
            browserOffset: null,
            displayTz: null,
            displayOffset: null,
            conversionOffset: null
        };

        var _dateAsTz = function (displayTz, browserTz) {
            mbConfig.browserTz = browserTz || mbConfig.browserTz || moment.tz.guess();
            mbConfig.browserOffset =  moment.tz.zone(mbConfig.browserTz).offset(this.toDate());

            mbConfig.displayTz = displayTz || mbConfig.displayTz || moment.tz.guess();
            mbConfig.displayOffset =  moment.tz.zone(displayTz).offset(this.toDate());

            // Calculate offset to create a DateTime which will look correct in a browser on your current timezone.
            mbConfig.conversionOffset = mbConfig.browserOffset - mbConfig.displayOffset;
            return moment(this.toDate()).add(mbConfig.conversionOffset, 'minute');
        };

        var _fromDateTz = function (date) {
            return moment(date).add(-1 * mbConfig.conversionOffset, 'minute');
        };

        moment.fn.browserConverter = function() {
            var that = this;
            return {
                asDisplayTz: function (displayTz, browserTz) {
                    return _dateAsTz.call(that, displayTz, browserTz);
                },
                fromDisplayTz: function (date) {
                    return _fromDateTz.call(that, date);
                }
            };
        };
        return moment;
    };

    if (typeof define === 'function' && define.amd) {
        define('moment-browser', ['moment'], function (moment) {
            return this.moment = initialize(moment);
        });
    } else if (typeof module !== 'undefined') {
        module.exports = initialize(require('moment'));
    } else if (typeof window !== "undefined" && window.moment) {
        this.moment = initialize(this.moment);
    }

}).call(this);

javascript: (function() {

/* -=[ KCR Translate ]=- */

    var Site1 = 'dict.cc';
    var Url1  = 'http://en-de.pocket.dict.cc/?s=';

    var Site2 = 'google';
    var Url2  = 'https://translate.google.com/?hl=en#auto/de/';

/*************************************************************/

    var w = null;
    var kDoc = null;
    var kObj = null;

    if (typeof window.KindleReaderContextMenu !== 'undefined') {
        w = window;

    } else if (window.length) {
        for (var i=0; i < window.length; i++) {
            if (typeof window[i].KindleReaderContextMenu !== 'undefined') {
                w = window[i];
                break;
            }
        }
    }

    if (typeof w === 'object') {
        kObj = w.KindleReaderContextMenu;
        kDoc = w.document;

        if (typeof kObj.KCTranslate === 'undefined') {
            kObj.KCTranslate = true;
            var oldMethod = kObj.show;

            kObj.show = function () {
                var res = oldMethod.apply(kObj, arguments);
                var txtDoc = null;
                var r = null;

                var width  = 600;
                var height = 400;

                if (window.screen) {
                    width  = window.screen.availWidth  * 80 / 100;
                    height = window.screen.availHeight * 85 / 100;
                }

                if (typeof (arguments[3]) !== 'undefined' && typeof (arguments[3]['start']) !== 'undefined') {
                    var sId = arguments[3]['start'];
                    var eId = arguments[3]['end'];

                    $('iframe', kDoc).each(function (j, textIframe) {
                        var textIFrameDoc = $(textIframe).contents().get(0);

                        if ($('#'+sId, textIFrameDoc).get(0)) {
                            txtDoc = textIFrameDoc;
                            return false;
                        }
                    });

                    if (txtDoc) {
                        r = txtDoc.createRange();

                        r.setStartBefore($('#'+sId, txtDoc).get(0));
                        r.setEndAfter($(   '#'+eId, txtDoc).get(0));
                    }
                }

                $('#KCTranslate_sep',   kDoc).remove();
                $('#KCTranslate_site1', kDoc).remove();
                $('#KCTranslate_site2', kDoc).remove();

                var styles = $('<style>.spinner, .dictionary.i18n.expanded {display:none !important;}'
                    + 'div#kindleReader_menu_contextMenu { max-height: 35px;}</style>');

                var sep = $('<div id="KCTranslate_sep" class="kindle_menu_separator"></div>');

                var site1 = $('<div id="KCTranslate_site1"'
                    + 'class="kindle_menu_button button_enabled ui-corner-left">' + Site1 + '</div>');

                var site2 = $('<div id="KCTranslate_site2"'
                    + 'class="kindle_menu_button button_enabled ui-corner-left">' + Site2 + '</div>');

                $('#kindle_menu_border', kDoc).append(sep).append(site1).append(sep).append(site2).append(styles);

                setTimeout(function(){
                    sep.show();

                    site1.removeClass('button_hidden');
                    site2.removeClass('button_hidden');
                }, 1);

                $('#KCTranslate_site1', kDoc).click(function (evt) {
                    if (r) {
                        var newW = window.open(Url1 + r, Site1,
                            "width=" + width + ",height=" + height + ",location=0,menubar=0,scrollbars=1,toolbar=0");
                    }
                });

                $('#KCTranslate_site2', kDoc).click(function (evt) {
                    if (r) {
                        var newW = window.open(Url2 + r, Site2,
                            "width=" + width + ",height=" + height + ",location=0,menubar=0,scrollbars=1,toolbar=0");
                    }
                });

                return res;
            };

            alert('Kindle Cloud Reader Translate is *NOW* active.');

        } else {
            alert('Kindle Cloud Reader Translate is *ALREADY* active.');
        }

    } else {
        alert('Error: Kindle Cloud Reader Translate is *NOT* active.');
    }
})();


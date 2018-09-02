javascript: (function() {

/* -=[ KCR Translate ]=- */

    var Url1 = 'https://idioms.thefreedictionary.com/';

    var Url2 = 'https://www.deepl.com/translator#en/de/';

    var Url3 = 'https://translate.google.de/#en/de/';

    var Url4 = 'http://en-de.dict.cc/?s=';

/*******************************************************/

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

        if (typeof kObj.KCRTranslate === 'undefined') {
            kObj.KCRTranslate = true;
            var oldMethod = kObj.show;

            kObj.show = function () {
                var res = oldMethod.apply(kObj, arguments);
                var txtDoc = null;
                var r = null;

                if (typeof (arguments[3]) !== 'undefined' && typeof (arguments[3]['start']) !== 'undefined') {
                    var sId = arguments[3]['start'];
                    var eId = arguments[3]['end'];

                    $('iframe', kDoc).each(function (j, textIframe) {
                        var textIFrameDoc = $(textIframe).contents().get(0);

                        if ($('#' + sId, textIFrameDoc).get(0)) {
                            txtDoc = textIFrameDoc;
                            return false;
                        }
                    });

                    if (txtDoc) {
                        r = txtDoc.createRange();

                        r.setStartBefore($('#' + sId, txtDoc).get(0));
                        r.setEndAfter(   $('#' + eId, txtDoc).get(0));
                    }
                }

                $('#KCRTranslate_sep',   kDoc).remove();
                $('#KCRTranslate_trans', kDoc).remove();
                $('#KCRTranslate_copy',  kDoc).remove();

                var styles = $('<style>.spinner, .dictionary.i18n.expanded {display:none !important;}'
                    + 'div#kindleReader_menu_contextMenu { max-height: 35px;}</style>');

                var sep = $('<div id="KCRTranslate_sep" class="kindle_menu_separator"></div>');

                var trans = $('<div id="KCRTranslate_trans"'
                    + 'class="kindle_menu_button button_enabled ui-corner-left">Translate</div>');

                var copy = $('<div id="KCRTranslate_copy"'
                    + 'class="kindle_menu_button button_enabled ui-corner-left">Copy</div>');

                $('#kindle_menu_border', kDoc).append(sep).append(trans).append(sep).append(copy).append(styles);

                setTimeout(function(){
                    sep.show();

                    trans.removeClass('button_hidden');
                    copy.removeClass('button_hidden');
                }, 1);

                $('#KCRTranslate_trans', kDoc).click(function (evt) {
                    if (r) {
                        var top    = screen.availHeight *  3 / 100;
                        var height = screen.availHeight * 77 / 100;
                        var left   = screen.availWidth  *  1 / 100;
                        var width  = screen.availWidth  * 99 / 100;

                        var win1 = window.open(Url1 + r, 'URL1',
                            "location=0,menubar=0,scrollbars=1,toolbar=0,status=0,titlebar=0,width=" +
                            width + ",height=" + height + ",top=" + top + ",left=" + left);

                        top    = screen.availHeight *  6 / 100;
                        height = screen.availHeight * 74 / 100;

                        var win2 = window.open(Url2 + r, 'URL2',
                            "location=0,menubar=0,scrollbars=1,toolbar=0,status=0,titlebar=0,width=" +
                            width + ",height=" + height + ",top=" + top + ",left=" + left);

                        top    = screen.availHeight *  9 / 100;
                        height = screen.availHeight * 71 / 100;

                        var win3 = window.open(Url3 + r, 'URL3',
                            "location=0,menubar=0,scrollbars=1,toolbar=0,status=0,titlebar=0,width=" +
                            width + ",height=" + height + ",top=" + top + ",left=" + left);

                        top    = screen.availHeight * 12 / 100;
                        height = screen.availHeight * 68 / 100;

                        var win4 = window.open(Url4 + r, 'URL4',
                            "location=0,menubar=0,scrollbars=1,toolbar=0,status=0,titlebar=0,width=" +
                            width + ",height=" + height + ",top=" + top + ",left=" + left).focus();
                    }
                });

                $('#KCRTranslate_copy', kDoc).click(function (evt) {
                    if (r) {
                        copyToClipboard(r.cloneContents().textContent);

                        $('.ui-widget-content', kDoc).hide();
                        $('#annotation-section', txtDoc).remove();
                    }
                });

                var copyToClipboard = function(textToCopy) {
                    $("body")
                        .append($('<input type="text" display="none" name="fname" class="textToCopyInput"/>')
                            .val(textToCopy))
                        .find(".textToCopyInput")
                        .select();

                    try {
                        var successful = document.execCommand('copy');
                    } catch (err) {
                        window.prompt("To copy the text to clipboard: Ctrl+C, Enter", textToCopy);
                    }

                    $(".textToCopyInput").remove();
                };

                return res;
            };

            alert('Kindle Cloud Reader Translate is now active.');

        } else {
            alert('Kindle Cloud Reader Translate is *ALREADY* active.');
        }

    } else {
        alert('Error: Kindle Cloud Reader Translate is *NOT* active.');
    }
})();


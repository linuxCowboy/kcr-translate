javascript: (function() {

/* -=[ KCR Translate ]=- */

    var Url1  = 'http://en-de.pocket.dict.cc/?s=';

    var Url2 = 'https://www.deepl.com/translator#en/de/';

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

        if (typeof kObj.KCRTranslate === 'undefined') {
            kObj.KCRTranslate = true;
            var oldMethod = kObj.show;

            kObj.show = function () {
                var res = oldMethod.apply(kObj, arguments);
                var txtDoc = null;
                var r = null;

                var width  = 600;
                var height = 400;

                if (window.screen) {
                    width  = screen.availWidth  * 70 / 100;
                    height = screen.availHeight * 40 / 100;
                    down   = screen.availHeight * 10 / 100 + height;
                }

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
                        var win1 = window.open(Url1 + r, 'Translate', "location=0,menubar=0,scrollbars=1,toolbar=0,width=" + width + ",height=" + height).focus();

                        setTimeout(function(){
                            var win2 = window.open(Url2 + r, 'Copy', "location=0,menubar=0,scrollbars=1,toolbar=0,width=" + width + ",height=" + height + ",top=" + down).focus();
                        }, 200);
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


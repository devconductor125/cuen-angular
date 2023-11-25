"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var BrowserUtils = (function () {
    function BrowserUtils() {
    }
    BrowserUtils.downloadJsonFromObject = function (object) {
        var json = JSON.stringify(object);
        var blob = new Blob([json], { type: 'octet/stream' });
        var url = window.URL.createObjectURL(blob);
        var filename = 'predio.json';
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute('download', filename);
        var clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        linkElement.dispatchEvent(clickEvent);
    };
    BrowserUtils.downloadZipFromBlob = function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        var filenameWithExtension = fileName + '.zip';
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute('download', filenameWithExtension);
        var clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        linkElement.dispatchEvent(clickEvent);
    };
    return BrowserUtils;
}());
exports.BrowserUtils = BrowserUtils;
//# sourceMappingURL=browser.utils.js.map
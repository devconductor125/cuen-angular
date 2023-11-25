"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var ByteArrayUtils = (function () {
    function ByteArrayUtils() {
    }
    ByteArrayUtils.saveByteArray = function (base64Data, name) {
        var data = this.base64ToArrayBuffer(base64Data);
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob(data, { type: 'octet/stream' }));
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    ByteArrayUtils.base64ToArrayBuffer = function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    };
    return ByteArrayUtils;
}());
exports.ByteArrayUtils = ByteArrayUtils;
//# sourceMappingURL=byte-array.utils.js.map
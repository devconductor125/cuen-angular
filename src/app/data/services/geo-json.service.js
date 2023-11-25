"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var base_service_1 = require("./base.service");
var GeoJsonService = (function (_super) {
    __extends(GeoJsonService, _super);
    function GeoJsonService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OGRE_API_URL = 'https://ogre.adc4gis.com';
        return _this;
    }
    GeoJsonService.prototype.getSession = function () {
        return this.sessionManager.getSession();
    };
    GeoJsonService.prototype.shapeToGeoJson = function (file) {
        var formData = new FormData();
        formData.append('upload', file, file.name);
        return this.http
            .post(this.OGRE_API_URL + "/convert", formData)
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    GeoJsonService.prototype.geoJsonToShape = function (geoJson, featureType) {
        var _this = this;
        var geoJsonClone = JSON.parse(JSON.stringify(geoJson));
        var i = geoJsonClone.features.length;
        while (i--) {
            if (geoJsonClone.features[i].geometry.type !== featureType) {
                geoJsonClone.features.splice(i, 1);
            }
        }
        return new Promise(function (resolve, reject) {
            if (geoJsonClone.features.length > 0) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function () {
                    if (this.readyState === 4) {
                        try {
                            var blob = new Blob([this.response], { type: 'application/zip' });
                            resolve(blob);
                        }
                        catch (ex) {
                            console.log(ex);
                            reject(ex);
                        }
                    }
                });
                xhr.open('POST', _this.OGRE_API_URL + "/convertJson");
                xhr.responseType = 'arraybuffer';
                var formData = new FormData();
                formData.append('json', JSON.stringify(geoJsonClone));
                formData.append('format', 'ESRI Shapefile');
                xhr.send(formData);
            }
        });
    };
    return GeoJsonService;
}(base_service_1.BaseService));
GeoJsonService = __decorate([
    core_1.Injectable()
], GeoJsonService);
exports.GeoJsonService = GeoJsonService;
//# sourceMappingURL=geo-json.service.js.map
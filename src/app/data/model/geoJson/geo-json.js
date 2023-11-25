"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeoJson = (function () {
    function GeoJson() {
        this.type = 'FeatureCollection';
        this.features = [];
    }
    GeoJson.prototype.addFeature = function (feature) {
        this.features.push(feature);
    };
    GeoJson.prototype.getFeatures = function () {
        return this.features;
    };
    return GeoJson;
}());
exports.GeoJson = GeoJson;
//# sourceMappingURL=geo-json.js.map
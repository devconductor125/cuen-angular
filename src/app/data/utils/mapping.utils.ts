import 'rxjs/add/operator/toPromise';
import {Predio} from '../model/predio';
import {GeoJsonGeometry} from '../model/geoJson/geo-json-geometry';
import {GeoJsonProperties} from '../model/geoJson/geo-json-properties';
import {GeoJson} from '../model/geoJson/geo-json';
import {Polygon} from '../model/polygon';
import {PQRS} from '../model/pqrs';
import {Dependency} from '../model/Dependency';
import {PQRSType} from '../model/PQRSType';
import {Budget} from '../model/budget';
import {PoolOfContractsAction} from '../model/pool-of-contracts-action';
import {SpecialTask} from '../model/specialTask';
import {PoolOfContractsOpenTask} from '../model/pool-of-contracts-open-task';

export class MappingUtils {
  static geoJsonToPredio(predioId: string, geoJson: GeoJson): Predio {
    const predio: Predio = new Predio(predioId);
    geoJson.features.forEach(function (feature: any) {
      switch (feature.geometry.type) {
        case 'Polygon':
          const polygon: Polygon = MappingUtils.featureToPolygon(feature);
          predio.addPolygon(polygon);
          break;
      }
    });
    predio.setGeoJson(geoJson);
    return predio;
  }

  private static featureToPolygon(feature: any): Polygon {
    const polygon = new Polygon();
    polygon.setType(feature.geometry.type);
    const geometry: GeoJsonGeometry = new GeoJsonGeometry(feature.geometry.type);
    if (feature.geometry.coordinates && feature.geometry.coordinates.length > 0) {
      geometry.setCoordinates(feature.geometry.coordinates);
    }
    polygon.setGeometry(geometry);
    const properties: GeoJsonProperties = new GeoJsonProperties();
    properties.setAcciones(feature.properties.ACCIONES);
    properties.setObjectId(feature.properties.OBJECTID);
    properties.setObservations(feature.properties.Observacio);
    properties.setPolygon(feature.properties.Pol);
    properties.setShapeArea(feature.properties.SHAPE_Area);
    properties.setShapeLength(feature.properties.Shape_Leng);
    polygon.setProperties(properties);
    return polygon;
  }

  static predioToGeoJson(predio: Predio): GeoJson {
    const geoJson = new GeoJson();
    predio.getPolygons().forEach(function (polygon: Polygon) {
      const feature = MappingUtils.polygonToFeature(polygon);
      geoJson.addFeature(feature);
    });
    return geoJson;
  }

  private static polygonToFeature(polygon: Polygon): object {
    const feature: any = {};
    feature.type = 'Feature';
    feature.geometry = {};
    feature.geometry.type = polygon.getType();
    feature.geometry = polygon.getGeometry();
    feature.properties = polygon.getProperties();
    return feature;
  }

  static getMockGeoJson() {
    return '{\n' +
      '\t"crs": null,\n' +
      '\t"features": [{\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [\n' +
      '\t\t\t\t[\n' +
      '\t\t\t\t\t[-75.5726983, 5.8870883],\n' +
      '\t\t\t\t\t[-75.5728, 5.8869983],\n' +
      '\t\t\t\t\t[-75.5730983, 5.8869183],\n' +
      '\t\t\t\t\t[-75.5731983, 5.8867783],\n' +
      '\t\t\t\t\t[-75.5731983, 5.88663],\n' +
      '\t\t\t\t\t[-75.5731983, 5.8864783],\n' +
      '\t\t\t\t\t[-75.5730983, 5.8860283],\n' +
      '\t\t\t\t\t[-75.5729983, 5.8857283],\n' +
      '\t\t\t\t\t[-75.5729983, 5.88562]\n' +
      '\t\t\t\t]\n' +
      '\t\t\t],\n' +
      '\t\t\t"type": "MultiLineString"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Aislamiento Bosque de Nacimiento",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [\n' +
      '\t\t\t\t[\n' +
      '\t\t\t\t\t[-75.5712, 5.8811483],\n' +
      '\t\t\t\t\t[-75.5711, 5.8810783],\n' +
      '\t\t\t\t\t[-75.5708983, 5.8809683],\n' +
      '\t\t\t\t\t[-75.5705983, 5.88081],\n' +
      '\t\t\t\t\t[-75.5704, 5.8807083],\n' +
      '\t\t\t\t\t[-75.5703, 5.8805883],\n' +
      '\t\t\t\t\t[-75.5701983, 5.88044],\n' +
      '\t\t\t\t\t[-75.5699983, 5.8800983],\n' +
      '\t\t\t\t\t[-75.5698, 5.8799983]\n' +
      '\t\t\t\t]\n' +
      '\t\t\t],\n' +
      '\t\t\t"type": "MultiLineString"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Aislamiento Bosque de Ladera",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5722983, 5.8845483],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.572, 5.8841483],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5718983, 5.884],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5717983, 5.88356],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5712983, 5.88274],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5713983, 5.8822],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}],\n' +
      '\t"last_added_feature": null,\n' +
      '\t"multi_line_string_features": [{\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [\n' +
      '\t\t\t\t[\n' +
      '\t\t\t\t\t[-75.5726983, 5.8870883],\n' +
      '\t\t\t\t\t[-75.5728, 5.8869983],\n' +
      '\t\t\t\t\t[-75.5730983, 5.8869183],\n' +
      '\t\t\t\t\t[-75.5731983, 5.8867783],\n' +
      '\t\t\t\t\t[-75.5731983, 5.88663],\n' +
      '\t\t\t\t\t[-75.5731983, 5.8864783],\n' +
      '\t\t\t\t\t[-75.5730983, 5.8860283],\n' +
      '\t\t\t\t\t[-75.5729983, 5.8857283],\n' +
      '\t\t\t\t\t[-75.5729983, 5.88562]\n' +
      '\t\t\t\t]\n' +
      '\t\t\t],\n' +
      '\t\t\t"type": "MultiLineString"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Aislamiento Bosque de Nacimiento",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [\n' +
      '\t\t\t\t[\n' +
      '\t\t\t\t\t[-75.5712, 5.8811483],\n' +
      '\t\t\t\t\t[-75.5711, 5.8810783],\n' +
      '\t\t\t\t\t[-75.5708983, 5.8809683],\n' +
      '\t\t\t\t\t[-75.5705983, 5.88081],\n' +
      '\t\t\t\t\t[-75.5704, 5.8807083],\n' +
      '\t\t\t\t\t[-75.5703, 5.8805883],\n' +
      '\t\t\t\t\t[-75.5701983, 5.88044],\n' +
      '\t\t\t\t\t[-75.5699983, 5.8800983],\n' +
      '\t\t\t\t\t[-75.5698, 5.8799983]\n' +
      '\t\t\t\t]\n' +
      '\t\t\t],\n' +
      '\t\t\t"type": "MultiLineString"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Aislamiento Bosque de Ladera",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}],\n' +
      '\t"point_features": [{\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5722983, 5.8845483],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.572, 5.8841483],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5718983, 5.884],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5717983, 5.88356],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5712983, 5.88274],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "Huerto leñero",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}, {\n' +
      '\t\t"geometry": {\n' +
      '\t\t\t"coordinates": [-75.5713983, 5.8822],\n' +
      '\t\t\t"type": "Point"\n' +
      '\t\t},\n' +
      '\t\t"properties": {\n' +
      '\t\t\t"Acciones": "STARD",\n' +
      '\t\t\t"OBJECTID": 0,\n' +
      '\t\t\t"Pol": null,\n' +
      '\t\t\t"SHAPE_Area": 0.0,\n' +
      '\t\t\t"Shape_Leng": 0.0\n' +
      '\t\t},\n' +
      '\t\t"type": "Feature"\n' +
      '\t}],\n' +
      '\t"type": "FeatureCollection"\n' +
      '}';
  }

  static pqrsResponseToPQRS(component: any, response: any): PQRS {
    response.conservation_agreement_corporation = Boolean(response.conservation_agreement_corporation);
    response.subscribe_agreement = Boolean(response.subscribe_agreement);
    const pqrs: PQRS = new PQRS();
    Object.assign(pqrs, response);
    if (response.response_pqrs && response.response_pqrs.length > 0) {
      pqrs.response = response.response_pqrs[0].response_email_request_pqrs;
    }
    component.dependencies.forEach(function (dependency: Dependency) {
      if (String(dependency.id) === String(response.rol.dependencies_role_id)) {
        pqrs.dependency = dependency;
      }
    });
    component.pqrsTypes.forEach(function (pqrsType: PQRSType) {
      if (String(pqrsType.id) === String(response.type_pqrs_id)) {
        pqrs.pqrsType = pqrsType;
      }
    });
    return pqrs;
  }

  static budgetToPoolOfContractsAction(processId: string, budget: Budget): PoolOfContractsAction {
    const action: PoolOfContractsAction = new PoolOfContractsAction();
    action.process_id = processId;
    action.budget_id = Number(budget.id);
    action.action = budget.action;
    action.type = budget.type;
    action.material = budget.material;
    action.task_id = budget.task_id;
    return action;
  }

  static specialTaskToPoolOfContractsSpecialTask(processId: string, specialTask: SpecialTask): PoolOfContractsOpenTask {
    const contractSpecialTask: PoolOfContractsOpenTask = new PoolOfContractsOpenTask();
    contractSpecialTask.task_open_id = Number(specialTask.id);
    contractSpecialTask.process_id = processId;
    return contractSpecialTask;
  }

  static mapPoolOfContractsActionToBudget(procedure: any): Budget {
    const budget: Budget = new Budget();
    budget.hash_map = procedure.id + '_' + procedure.pool_id + '_' + procedure.process_id + '_' + procedure.budget_id + '_' + procedure.action + '_' + procedure.material;
    budget.action = procedure.action;
    budget.material = procedure.material;
    budget.selected = true;
    budget.id = String(procedure.budget_id);
    return budget;
  }

  static mapPoolOfContractsOpenTaskToOpenTask(openTask: any): SpecialTask {
    const specialTask: SpecialTask = new SpecialTask();
    specialTask.selected = true;
    specialTask.id = String(openTask.task_open_id);
    specialTask.type = String(openTask.task_open_type);
    specialTask.description = String(openTask.task_open_description);
    return specialTask;
  }
}

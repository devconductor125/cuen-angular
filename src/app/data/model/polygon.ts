import {GeoJsonGeometry} from './geoJson/geo-json-geometry';
import {BaseObject} from './base-object';
import {GeoJsonProperties} from './geoJson/geo-json-properties';

export class Polygon extends BaseObject {
  private type: string;
  private geometry: GeoJsonGeometry;
  private properties: GeoJsonProperties;

  constructor() {
    super();
  }

  getGeometry(): GeoJsonGeometry {
    return this.geometry;
  }

  setGeometry(geometry: GeoJsonGeometry) {
    this.geometry = geometry;
  }

  getCenterLatitude(): number {
    return this.geometry.getCoordinates()[0][0][1];
  }

  getCenterLongitude() {
    return this.geometry.getCoordinates()[0][0][0];
  }

  getArrayForMap(): Array<{}> {
    const arrayForMap: Array<{}> = [];
    this.geometry.getCoordinates()[0].forEach(function (coordinates: Array<number>) {
      const coordinate: any = {};
      coordinate.lat = coordinates[1];
      coordinate.lng = coordinates[0];
      arrayForMap.push(coordinate);
    });
    return arrayForMap;
  }

  setType(type: string) {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  setProperties(properties: GeoJsonProperties) {
    this.properties = properties;
  }

  getProperties(): GeoJsonProperties {
    return this.properties;
  }
}

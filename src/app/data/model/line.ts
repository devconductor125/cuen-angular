import {GeoJsonGeometry} from './geoJson/geo-json-geometry';
import {BaseObject} from './base-object';

export class Line extends BaseObject {
  private geometry: Array<GeoJsonGeometry>;

  constructor() {
    super();
    this.geometry = [];
  }

  setCoordinates(coordinates: Array<GeoJsonGeometry>) {
    this.geometry = coordinates;
  }

  getCoordinates(): Array<GeoJsonGeometry> {
    return this.geometry;
  }

  removeLastCoordinate() {
    this.geometry.pop();
  }

  addCoordinate(coordinate: GeoJsonGeometry) {
    this.geometry.push(coordinate);
  }
}

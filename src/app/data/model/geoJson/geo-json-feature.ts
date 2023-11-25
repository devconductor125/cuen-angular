import {GeoJsonGeometry} from './geo-json-geometry';
import {GeoJsonProperties} from './geo-json-properties';

export class GeoJsonObject {
  geometry: GeoJsonGeometry;
  properties: GeoJsonProperties;
  features: Array<object>;

  constructor(private type: string) {
    this.type = type;
  }
}

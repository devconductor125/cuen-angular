import {Polygon} from './polygon';
import {BaseObject} from './base-object';

export class Predio extends BaseObject {
  private geoJson: any;
  private polygons: Polygon[];

  constructor(objectId: string) {
    super();
    this.id = objectId;
    this.polygons = [];
  }

  getPolygons(): Array<Polygon> {
    return this.polygons;
  }

  getPolygon(objectId: string): Polygon {
    let resultArea: Polygon = null;
    this.polygons.forEach(function (polygon: Polygon) {
      if (polygon.id === objectId) {
        resultArea = polygon;
      }
    });
    return resultArea;
  }

  setPolygons(area: Array<Polygon>) {
    this.polygons = area;
  }

  removeLastPolygon(): void {
    this.polygons.pop();
  }

  addPolygon(area: Polygon) {
    this.polygons.push(area);
  }

  setGeoJson(geoJson: any) {
    this.geoJson = geoJson;
  }

  getGeoJson(): any {
    return this.geoJson;
  }
}

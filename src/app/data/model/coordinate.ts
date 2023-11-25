import {BaseObject} from './base-object';

export class Coordinate extends BaseObject {
  private lat: number;
  private lng: number;

  constructor() {
    super();
  }

  setLatitude(latitude: number) {
    this.lat = latitude;
  }

  getLatitude(): number {
    return this.lat;
  }

  setLongitude(longitude: number) {
    this.lng = longitude;
  }

  getLongitude(): number {
    return this.lng;
  }
}

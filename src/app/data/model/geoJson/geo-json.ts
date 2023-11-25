export class GeoJson {
  public type: string;
  public features: Array<object>;

  constructor() {
    this.type = 'FeatureCollection';
    this.features = [];
  }

  addFeature(feature: object) {
    this.features.push(feature);
  }

  getFeatures() {
    return this.features;
  }
}

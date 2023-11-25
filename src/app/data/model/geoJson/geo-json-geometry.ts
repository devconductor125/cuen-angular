import {Coordinate} from '../coordinate';

export class GeoJsonGeometry {
  coordinates: Array<Array<Array<number>>>;

  constructor(private type: string) {
    this.type = type;
    this.coordinates = [];
  }

  setCoordinates(coordinates: Array<Array<Array<number>>>) {
    this.coordinates = coordinates;
  }

  getCoordinates(): Array<Array<Array<number>>> {
    return this.coordinates;
  }

  removeLastCoordinate() {
    this.coordinates.pop();
  }

  addCoordinates(newCoordinates: Array<Coordinate>) {
    const component = this;
    newCoordinates.forEach(function (coordinate: Coordinate) {
      const coordinatesArray = [];
      coordinatesArray.push(coordinate.getLatitude());
      coordinatesArray.push(coordinate.getLongitude());
      component.coordinates[0].push(coordinatesArray);
    });
  }
}

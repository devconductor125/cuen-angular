import 'rxjs/add/operator/toPromise';

export class GeoUtils {
  static distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }

  static ddToDms(lat: any, lng: any) {

    let latResult, lngResult, dmsResult;

    lat = parseFloat(lat);
    lng = parseFloat(lng);

    latResult = (lat >= 0) ? 'N' : 'S';

    // Call to getDms(lat) function for the coordinates of Latitude in DMS.
    // The result is stored in latResult variable.
    latResult += this.getDms(lat);

    lngResult = (lng >= 0) ? 'E' : 'W';

    // Call to getDms(lng) function for the coordinates of Longitude in DMS.
    // The result is stored in lngResult variable.
    lngResult += this.getDms(lng);

    // Joining both variables and separate them with a space.
    dmsResult = latResult + ' ' + lngResult;

    // Return the resultant string
    return dmsResult;
  }

  private static getDms(val: any) {

    let valDeg, valMin, valSec, result;

    val = Math.abs(val);

    valDeg = Math.floor(val);
    result = valDeg + 'º';

    valMin = Math.floor((val - valDeg) * 60);
    result += valMin + '\'';

    valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000;
    result += valSec + '"';

    return result;
  }
}

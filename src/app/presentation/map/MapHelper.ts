import {Point} from '../../data/model/monitoreo-detail';

export class MapHelper {
  public static POINT = 'Point';
  public static POLYGON = 'Polygon';
  public static MULTI_POLYGON = 'MultiPolygon';
  public static LINE = 'LineString';
  public static MULTI_LINE = 'MultiLineString';

  static addFeatureToMap(component: any, google: any, feature: any, markerBounds: any) {
    switch (feature.geometry.type) {
      case MapHelper.LINE:
        const coordinates1: any[] = feature.geometry.coordinates;
        const polylineCoordinates: Array<any> = [];
        coordinates1.forEach(function (coordinate: any[]) {
          polylineCoordinates.push({lat: coordinate[1], lng: coordinate[0]});
          const boundsPoint = new google.maps.LatLng(coordinate[1], coordinate[0]);
          markerBounds.extend(boundsPoint);
        });
        const mapPolyline = new google.maps.Polyline({
          path: polylineCoordinates,
          strokeColor: feature.properties.Color,
          strokeOpacity: 1,
          strokeWeight: 5,
          fillColor: feature.properties.Color,
          fillOpacity: 0.35,
          zIndex: 4
        });
        mapPolyline.data = feature;
        google.maps.event.addListener(mapPolyline, 'click', function (event: any) {
          if (component.onFeatureClicked) {
            component.onFeatureClicked('1', mapPolyline.data, event);
          }
        });
        mapPolyline.setMap(component.map);
        mapPolyline.id = feature.properties.AccionId;
        component.polylines.push(mapPolyline);
        break;
      case MapHelper.MULTI_LINE:
        feature.geometry.coordinates.forEach(function (coordinatesArray: any[]) {
          const coordinates2: any[] = coordinatesArray;
          const multiStringPolylineCoordinates: Array<any> = [];
          coordinates2.forEach(function (coordinate: any[]) {
            multiStringPolylineCoordinates.push({lat: coordinate[1], lng: coordinate[0]});
            const boundsPoint = new google.maps.LatLng(coordinate[1], coordinate[0]);
            markerBounds.extend(boundsPoint);
          });
          const mapPolyline2 = new google.maps.Polyline({
            path: multiStringPolylineCoordinates,
            strokeColor: feature.properties.Color,
            strokeOpacity: 0.8,
            strokeWeight: 4,
            fillColor: feature.properties.Color,
            fillOpacity: 0.35,
            zIndex: 6
          });
          mapPolyline2.data = feature;
          google.maps.event.addListener(mapPolyline2, 'click', function (event: any) {
            if (component.onFeatureClicked) {
              component.onFeatureClicked('1', mapPolyline2.data, event);
            }
          });
          mapPolyline2.setMap(component.map);
          mapPolyline2.id = feature.properties.AccionId;
          component.polylines.push(mapPolyline2);
        });
        break;
      case MapHelper.POLYGON:
        const coordinates3: any[] = feature.geometry.coordinates;
        const polygonCoordinates: Array<any> = [];
        coordinates3.forEach(function (coordinate: any[]) {
          coordinate.forEach(function (point: any[]) {
            polygonCoordinates.push({lat: point[1], lng: point[0]});
            const boundsPoint = new google.maps.LatLng(point[1], point[0]);
            markerBounds.extend(boundsPoint);
          });
        });
        const mapPolygon = new google.maps.Polygon({
          path: polygonCoordinates,
          strokeColor: '#00FFFFFF',
          strokeOpacity: 0,
          strokeWeight: 0,
          fillColor: feature.properties.FillColor,
          fillOpacity: 0.35,
          zIndex: 3
        });
        mapPolygon.data = feature;
        google.maps.event.addListener(mapPolygon, 'click', function (event: any) {
          if (component.onFeatureClicked) {
            component.onFeatureClicked('1', mapPolygon.data, event);
          }
        });
        mapPolygon.setMap(component.map);
        mapPolygon.id = feature.properties.AccionId;
        component.polygons.push(mapPolygon);
        break;
      case MapHelper.MULTI_POLYGON:
        feature.geometry.coordinates.forEach(function (coordinatesArray: any[]) {
          const multiPolygonCoordinates: Array<any> = [];
          coordinatesArray.forEach(function (coordinate: any[]) {
            coordinate.forEach(function (point: any[]) {
              multiPolygonCoordinates.push({lat: point[1], lng: point[0]});
              const boundsPoint = new google.maps.LatLng(point[1], point[0]);
              markerBounds.extend(boundsPoint);
            });
          });
          const mapMultiPolygon = new google.maps.Polygon({
            path: multiPolygonCoordinates,
            strokeColor: '#00FFFFFF',
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: feature.properties.FillColor,
            fillOpacity: 0.35,
            zIndex: 2
          });
          mapMultiPolygon.data = feature;
          google.maps.event.addListener(mapMultiPolygon, 'click', function (event: any) {
            if (component.onFeatureClicked) {
              component.onFeatureClicked('1', mapMultiPolygon.data, event);
            }
          });
          mapMultiPolygon.setMap(component.map);
          mapMultiPolygon.id = feature.properties.AccionId;
          component.polygons.push(mapMultiPolygon);
        });
        break;
      case MapHelper.POINT:
        const pointCoordinates: any[] = feature.geometry.coordinates;
        if (pointCoordinates[1] !== pointCoordinates[0]) {
          const center = {lat: pointCoordinates[1], lng: pointCoordinates[0]};

          let radius = 4;
          if (feature.properties.Area_inter || feature.properties.ICA_NFS && feature.properties.ICA_NFS >= 0) {
            radius = 250;
          }

          const mapCircle = new google.maps.Circle({
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: feature.properties.Color,
            fillOpacity: 1,
            center: center,
            radius: radius,
            zIndex: 8
          });
          mapCircle.data = feature;
          google.maps.event.addListener(mapCircle, 'click', function (event: any) {
            if (component.onFeatureClicked) {
              component.onFeatureClicked('1', mapCircle.data, event);
            }
          });
          const boundsPoint = new google.maps.LatLng(pointCoordinates[1], pointCoordinates[0]);
          markerBounds.extend(boundsPoint);
          mapCircle.setMap(component.map);
          mapCircle.id = feature.properties.AccionId;
          component.circles.push(mapCircle);
        }
        break;
    }
  }

  static addMonitoreoPointToMap(component: any, google: any, point: Point) {
    const pointCoordinates: string[] = point.coordinate.split(',');
    const latLng = new google.maps.LatLng(Number(pointCoordinates[0]), Number(pointCoordinates[1]));
    const icon = {
      path: 'M50,40c-8.285,0-15,6.718-15,15c0,8.285,6.715,15,15,15c8.283,0,15-6.715,15-15 ' +
        '   C65,46.718,58.283,40,50,40z M90,25H78c-1.65,0-3.428-1.28-3.949-2.846l-3.102-9.309C70.426,11.28,68.65,10,67,10H33  ' +
        '  c-1.65,0-3.428,1.28-3.949,2.846l-3.102,9.309C25.426,23.72,23.65,25,22,25H10C4.5,25,0,29.5,0,35v45c0,5.5,4.5,10,10,10h80   ' +
        ' c5.5,0,10-4.5,10-10V35C100,29.5,95.5,25,90,25z M50,80c-13.807,0-25-11.193-25-25c0-13.806,11.193-25,25-25  ' +
        '  c13.805,0,25,11.194,25,25C75,68.807,63.805,80,50,80z M86.5,41.993c-1.932,0-3.5-1.566-3.5-3.5c0-1.932,1.568-3.5,3.5-3.5  ' +
        '  c1.934,0,3.5,1.568,3.5,3.5C90,40.427,88.433,41.993,86.5,41.993z',
      fillColor: '#006DF0',
      fillOpacity: .6,
      strokeWeight: 0,
      scale: 1
    };
    const marker = new google.maps.Marker({
      position: latLng,
      draggable: false,
      icon: icon,
      customInfo: point
    });
    google.maps.event.addListener(marker, 'click', function () {
      if (component.onMonitoreoPointClicked) {
        component.onMonitoreoPointClicked(this.customInfo);
      }
    });
    marker.setMap(component.map);
  }

  static getGeoJsonBudget(geoJson: geoJsonInterface.GeoJson) {
    const budget: any = [];
    geoJson.features.forEach(function (feature) {
        let hasBudget: boolean;
        if (feature.properties.LONGITUD_M) {
          hasBudget = true;
        } else {
          if (feature.properties.ACCIONES && feature.properties.ACCIONES.length > 0) {
            hasBudget = MapHelper.polygonHasBudget(feature.properties.ACCIONES);
          }
        }
        if (feature.properties.ACCIONES && hasBudget && feature.properties.AccionId && feature.properties.MaterialId) {
          const budgetItem: any = {};
          budgetItem.actionId = feature.properties.AccionId;
          budgetItem.hash = feature.properties.hash;
          budgetItem.length = feature.properties.LONGITUD_M ? feature.properties.LONGITUD_M : feature.properties.AREA_HA;
          budgetItem.materialId = feature.properties.MaterialId;
          budgetItem.polygon = feature.properties.POLIGONO;
          budget.push(budgetItem);
        }
      }
    );
    return budget;
  }

  private static polygonHasBudget(actionName: string): boolean {
    const newActionName = actionName.replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (newActionName.includes('enriquecimiento')) {
      return true;
    } else {
      return newActionName.includes('establecimiento ');
    }
  }
}

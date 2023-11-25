import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {Token} from '../model/token';
import GeoJson = geoJsonInterface.GeoJson;
import { fstat } from 'fs';
import { Binary } from '@angular/compiler';

@Injectable()
export class GeoJsonService extends BaseService {
  private OGRE_API_URL = 'https://ogre.adc4gis.com';

  protected getSession(): Token {
    return this.sessionManager.getSession();
  }

  shapeToGeoJson(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('upload', file, file.name);
    return this.http
      .post(`${this.OGRE_API_URL}/convert`, formData)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  geoJsonToShape(geoJson: GeoJson, featureType: string): Promise<any> {
    const geoJsonClone: GeoJson = JSON.parse(JSON.stringify(geoJson));
    let i = geoJsonClone.features.length;
    while (i--) {
      if (geoJsonClone.features[i].geometry.type !== featureType) {
        geoJsonClone.features.splice(i, 1);
      }
    }
    return new Promise((resolve, reject) => {
      if (geoJsonClone.features.length > 0) {
        // const xhr = new XMLHttpRequest();
        // xhr.addEventListener('readystatechange', function () {
        //   if (this.readyState === 4) {
        //     try {
        //       const blob: Blob = new Blob([this.response], {type: 'application/zip'});
        //       resolve(blob);
        //     } catch (ex) {
        //       reject(ex);
        //     }
        //   }
        // });
        // xhr.open('POST', `${this.OGRE_API_URL}/convertJson`);
        // xhr.responseType = 'arraybuffer';
        // const formData: FormData = new FormData();
        // formData.append('json', JSON.stringify(geoJsonClone));
        // formData.append('format', 'ESRI Shapefile');
        // xhr.send(formData);
        var params ={
            json:JSON.stringify(geoJsonClone),
            foramt: "ESRI Shapefile"
        };
        var xhrOverride = new XMLHttpRequest();
        xhrOverride.responseType = 'arraybuffer';

        $.ajax({
          url:'https://ogre.adc4gis.com/convertJson',
          type: "POST",
          xhr: function() {
            return xhrOverride;
          },
          data: params,
          success: function(response, status, xhr) {
              var type = xhr.getResponseHeader('Content-Type');
              try {
                const blob: Blob = new Blob([response], {type: "text/plain"});
                resolve(blob);
              } catch (ex) {
                reject(ex);
              }
          }
        });
      }
    });
  }
}

import 'rxjs/add/operator/toPromise';

export class BrowserUtils {
  static downloadJsonFromObject(object: any): void {
    const json = JSON.stringify(object);
    const blob = new Blob([json], {type: 'octet/stream'});
    const url = window.URL.createObjectURL(blob);
    const filename = 'predio.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', filename);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }

  static downloadZipFromBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const filenameWithExtension = fileName + '.zip';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', filenameWithExtension);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }

  static downloadAnyFromBlob(blob: Blob, fileName: String, extension: String) {
    const url = window.URL.createObjectURL(blob);
    const filenameWithExtension = fileName + '.' + extension;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', filenameWithExtension);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }

  static downloadAnyFromBase64(base64: string, fileName: string, extension: string, contentType: string) {
    const blob: Blob = BrowserUtils.b64toBlob(base64, contentType);
    const url = window.URL.createObjectURL(blob);
    const filenameWithExtension = fileName + '.' + extension;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', filenameWithExtension);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }

  private static b64toBlob(b64Data: any, contentType: any): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  static downloadReporteCostos(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const filenameWithExtension = fileName + '.xlsx';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', filenameWithExtension);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }

  static downloadExcelFromBlob(blob: Blob) {
    BrowserUtils.downloadExcelFromBlobWithName(blob, 'Archivo');
  }

  static downloadExcelFromBlobWithName(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const filenameWithExtension = fileName + '.xls';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', filenameWithExtension);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    linkElement.dispatchEvent(clickEvent);
  }
}

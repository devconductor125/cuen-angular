import 'rxjs/add/operator/toPromise';

export class ByteArrayUtils {
  static saveByteArray(base64Data: ArrayBuffer, name: string): void {
    const data = this.base64ToArrayBuffer(base64Data);
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob(data, {type: 'octet/stream'}));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private static base64ToArrayBuffer(base64: any): any {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

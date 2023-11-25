import 'rxjs/add/operator/toPromise';
import * as ShaJs from 'sha.js';

export class SHAUtils {
  static getSha256(base: string): string {
    return ShaJs('sha256').update(base).digest('hex');
  }
}

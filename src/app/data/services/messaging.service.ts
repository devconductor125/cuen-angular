import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

export class BusMessage {

  constructor(private channel: string,
              private data: any) {
  }

  getChannel(): string {
    return this.channel;
  }

  getData(): any {
    return this.data;
  }
}

@Injectable()
export class MessagingService {
  private message: Subject<BusMessage>;

  constructor() {
    this.message = new Subject<BusMessage>();
  }

  public publish(message: BusMessage): void {
    this.message.next(message);
  }

  public getObservable(): Observable<BusMessage> {
    return this.message.asObservable();
  }
}

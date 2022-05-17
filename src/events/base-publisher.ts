import {JetStreamClient, StringCodec} from 'nats'
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  protected client: JetStreamClient;

  constructor(client: JetStreamClient) {
    this.client = client;
  };

  async publish (data: T['data']): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const sc = StringCodec();
        await this.client.publish(this.subject, sc.encode(JSON.stringify(data)));
        console.log('Event published to subject', this.subject);
        resolve();
      } catch (err) {
        reject(err);
      }
    })
  };
}

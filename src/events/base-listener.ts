import {
  consumerOpts, ConsumerOptsBuilder, createInbox,
  JetStreamClient, JsMsg,
  StringCodec,
} from 'nats';
import { Subjects } from './subjects';


interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  protected client: JetStreamClient;
  protected ackWait=  5 * 1000;

  abstract onMessage (data: T['data'], msg: JsMsg): void;

  constructor(client: JetStreamClient) {
    this.client = client;
  }

  subscriptionOptions() {
    const opts: ConsumerOptsBuilder = consumerOpts();
    opts.durable(this.queueGroupName);
    opts.manualAck();
    opts.ackExplicit();
    opts.ackWait(this.ackWait);
    opts.deliverTo(createInbox());
    opts.deliverAll();
    return opts;
  }

  async listen () {
    const sc = StringCodec();
  
    const subscription = await this.client.subscribe(this.subject, this.subscriptionOptions());
      for await (const m of subscription) {
        this.onMessage(JSON.parse(sc.decode(m.data)), m);
      }
  }
}

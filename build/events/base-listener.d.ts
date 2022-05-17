import { ConsumerOptsBuilder, JetStreamClient, JsMsg } from 'nats';
import { Subjects } from './subjects';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    protected client: JetStreamClient;
    protected ackWait: number;
    abstract onMessage(data: T['data'], msg: JsMsg): void;
    constructor(client: JetStreamClient);
    subscriptionOptions(): ConsumerOptsBuilder;
    listen(): Promise<void>;
}
export {};

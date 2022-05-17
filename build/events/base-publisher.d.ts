import { JetStreamClient } from 'nats';
import { Subjects } from './subjects';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    protected client: JetStreamClient;
    constructor(client: JetStreamClient);
    publish(data: T['data']): Promise<void>;
}
export {};

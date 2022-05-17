import { Subjects } from "./subjects";

export interface SensorCreatedEvent {
    subject: Subjects.SensorCreated;
    data: {
        id: string;
        name: string;
        schema: any;
        token: string;
    };
}

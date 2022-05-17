import { Subjects } from "./subjects";

export interface SensorDeletedEvent {
    subject: Subjects.SensorDeleted;
    data: {
        id: string;
    };
}
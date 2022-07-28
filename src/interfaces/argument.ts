import { Types } from "../enums/types";

export interface Argument {
    allowedTypes: Types[];
    order: number;
    info: string;
}

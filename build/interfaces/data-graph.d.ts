import { GraphTypes } from "../enums/graphTypes";
export interface DataGraph {
    x?: {
        input: string;
        isLabel: boolean;
    };
    y?: {
        input: string;
        isLabel: boolean;
    };
    type: GraphTypes;
}

import { GraphTypes } from "../enums/graphTypes";
import { DataGraphInputs } from "./data-graph-inputs";
export interface DataGraph {
    inputs: DataGraphInputs[];
    type: GraphTypes;
}

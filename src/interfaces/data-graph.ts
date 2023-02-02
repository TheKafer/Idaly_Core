import { GraphTypes } from "../enums/graphTypes";
import { DataGraphArgument } from "./data-graph-argument";

export interface DataGraph {
    x?: DataGraphArgument[];
    y?: DataGraphArgument[];
    type: GraphTypes;
}

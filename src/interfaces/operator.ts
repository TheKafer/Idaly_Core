import { OperatorTypes } from "../enums/operator-types";
import { Types } from "../enums/types";
import { Argument } from "./argument";

export interface Operator {
    name: string;
    type: OperatorTypes;
    arguments?: Argument[];
    return?: Types;
}

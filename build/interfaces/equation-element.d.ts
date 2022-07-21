import { EquationElements } from "../enums/equation-elements";
export interface EquationElement {
    element: any;
    type: EquationElements;
    startLocation: number;
    endLocation: number;
}

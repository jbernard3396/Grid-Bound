import { ACTIONS } from "../enums/ACTIONS";

export interface ICellObject {
    disabledActions : Array<typeof ACTIONS>;
}
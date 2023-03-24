import { ACTIONS } from "../enums/action";

export interface ICellObject {
    disabledActions : Array<typeof ACTIONS>;
}
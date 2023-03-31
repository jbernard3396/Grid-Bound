import { ACTIONS } from "../enums/action";
import { CellStats } from "../cell/cellStats";

export interface ICellObject {
    disabledActions : Array<ACTIONS>;
    stats: CellStats | null;
}
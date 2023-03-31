import { ACTIONS } from '../enums/action';
import { CellStats } from '../cell/cellStats';
export class Terrain {
    disabledActions : Array<ACTIONS>;
    stats : CellStats | null;
    constructor(disabledActions : Array<ACTIONS> = [], stats : CellStats | null = null) {
        this.disabledActions = disabledActions;
        this.stats = stats;
    }
}
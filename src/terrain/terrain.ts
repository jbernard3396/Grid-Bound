import { ACTIONS } from '../enums/action';
export class Terrain {
    disabledActions : Array<ACTIONS>;
    constructor(disabledActions : Array<ACTIONS> = []) {
        this.disabledActions = disabledActions;
    }
}
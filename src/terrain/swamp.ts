import { Terrain } from './Terrain';
import { ACTIONS } from '../enums/action';
export class Swamp extends Terrain {
    constructor() {
        super([ACTIONS.MOVE, ACTIONS.SEE_THROUGH, ACTIONS.STAND]);

    }
}
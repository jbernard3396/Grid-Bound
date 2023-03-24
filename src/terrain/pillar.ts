import { Terrain } from './Terrain';
import { ACTIONS } from '../enums/action';
export class Pillar extends Terrain {
    constructor() {
        super([ACTIONS.MOVE, ACTIONS.SEE_THROUGH, ACTIONS.STAND]);

    }
}
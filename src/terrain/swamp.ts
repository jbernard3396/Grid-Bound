import { Terrain } from './Terrain';
import { CellStats } from '../../src/cell/cellStats';
export class Swamp extends Terrain {
    constructor() {
        super([] , new CellStats(1, 0,0));

    }
}
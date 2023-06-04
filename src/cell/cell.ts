import { ICellObject } from "../interfaces/ICellObject";
import { CellStats } from "./cellStats";
class Cell {
    value : Array<ICellObject>|null;
    constructor(value : Array<ICellObject>|null = null) {
        this.value = value;
    }

    addCellObject(cellObject : ICellObject) {
        if (this.value) {
            this.value.push(cellObject);
        } else {
            this.value = new Array<ICellObject>(cellObject);
        }
    }

    removeCellObject(cellObject : ICellObject) {
        if (!this.value) {
            throw new Error('Cell does exist');
        }
        if(!this.value.includes(cellObject)) {
            throw new Error('Cell does not contain cellObject');
        }
        if (this.value) {
            this.value = this.value.filter((value : ICellObject) => value !== cellObject);
        }
    }

    getDisabledActions() : Array<string> {
        if (!this.value) {
            return new Array<string>();
        }
        let disabledActions : Array<string> = new Array<string>();
        this.value.forEach((cellObject : ICellObject) => {
            disabledActions = disabledActions.concat(cellObject.disabledActions);
        });
        return disabledActions;
    }

    getCellStats() : CellStats {
        if (!this.value) {
            return new CellStats();
        }
        let movementPenalty : number = 0;
        let visionPenalty : number = 0;
        let targetPenalty : number = 0;
        this.value.forEach((cellObject : ICellObject) => {
            movementPenalty += cellObject.stats?.movementPenalty || 0;
            visionPenalty += cellObject.stats?.visionPenalty || 0;
            targetPenalty += cellObject.stats?.targetPenalty || 0;
        });
        return new CellStats(movementPenalty, visionPenalty, targetPenalty);
    }
}

export {Cell}; 
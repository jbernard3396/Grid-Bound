import { ICellObject } from "../interfaces/ICellObject";
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
            throw new Error('Cell does not contain cellObject');
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
}

export {Cell}; 
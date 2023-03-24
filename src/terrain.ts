export class Terrain {
    disabledActions : Array<string>;
    constructor(disabledActions : Array<string> = []) {
        this.disabledActions = disabledActions;
    }
}
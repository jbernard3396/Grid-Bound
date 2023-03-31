export class CellStats {
    movementCost: number = 1;
    visionCost: number = 1;
    targetCost: number = 1;
    constructor(movementCost: number = 1, visionCost: number = 1, targetCost: number = 1) {
        this.movementCost = movementCost;
        this.visionCost = visionCost;
        this.targetCost = targetCost;
    };
};
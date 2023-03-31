export class CellStats {
    movementPenalty: number = 0;
    visionPenalty: number = 0;
    targetPenalty: number = 0;
    constructor(movementPenalty: number = 0, visionPenalty: number = 0, targetPenalty: number = 0) {
        this.movementPenalty = movementPenalty;
        this.visionPenalty = visionPenalty;
        this.targetPenalty = targetPenalty;
    };
};
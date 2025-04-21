import { config } from "@/utils/config";
import { oPiece } from "@/gameObjects/o";
import { lPiece } from "@/gameObjects/l";

export default class Block {
  private block: number[][];
  private rotation: number = 0;
  yPos: number = 0;
  xPos: number = Math.floor(config.noOfCols / 2);

  constructor() {
    this.block = lPiece;
  }

  getShape() {
    return this.block[this.rotation].map(
      (block) => block + this.xPos + this.yPos
    );
  }
}

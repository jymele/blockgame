import { config } from "@/utils/config";
// import { oPiece } from "@/gameObjects/o";
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
      (block) => block + this.xPos + this.yPos * config.noOfCols
    );
  }

  rotate() {
    this.rotation = (this.rotation + 1) % this.block.length;

    if (this.xPos > Math.floor(config.noOfCols / 2)) {
      console.log("exceedsRightBoundary", this.exceedsRightBoundary());
      while (this.exceedsRightBoundary()) {
        this.xPos--;
      }
    }
  }

  exceedsRightBoundary() {
    return this.block[this.rotation].some(
      (block) => (block % config.noOfCols) + this.xPos >= config.noOfCols
    );
  }

  goDown() {
    this.yPos++;
  }

  goLeft() {
    if (this.xPos > 0) {
      this.xPos--;
    }
  }

  goRight() {
    if (this.xPos < config.noOfCols - 1) {
      this.xPos++;
    }
  }

  checkIfCanMoveDown() {
    const shape = this.getShape();
    const canMoveDown = shape.every((block) => {
      const y = Math.floor(block / config.noOfCols);
      return y < config.noOfRows - 1;
    });
    return canMoveDown;
  }
}

import { config } from "@/utils/config";
import { allBlocks, getBlockFromName } from "@/gameObjects/piece";

export default class Block {
  private block: number[][];
  private rotation: number = 0;
  yPos: number = 0;
  xPos: number = Math.floor(config.noOfCols / 2);
  public nextBlock: string;

  constructor() {
    this.block = getBlockFromName("t");
    this.nextBlock = this.getRandomBlock();
  }

  getRandomBlock(): string {
    const randomIndex = Math.floor(Math.random() * allBlocks.length);
    return allBlocks[randomIndex];
  }

  getNextBlock() {
    this.block = getBlockFromName(this.nextBlock);
    this.nextBlock = this.getRandomBlock();
    this.initializePosition();
  }

  initializePosition() {
    this.xPos = Math.floor(config.noOfCols / 2);
    this.yPos = 0;
    this.rotation = 0;
  }

  getShape() {
    return this.block[this.rotation].map(
      (block) => block + this.xPos + this.yPos * config.noOfCols
    );
  }

  rotate() {
    this.rotation = (this.rotation + 1) % this.block.length;

    if (this.xPos > Math.floor(config.noOfCols / 2)) {
      while (this.exceedsRightBoundary()) {
        this.xPos--;
      }
    } else {
      while (this.exceedsLeftBoundary()) {
        this.xPos++;
      }
    }
  }

  exceedsRightBoundary() {
    return this.block[this.rotation].some(
      (block) =>
        Math.abs((block % config.noOfCols) + this.xPos) >= config.noOfCols
    );
  }

  exceedsLeftBoundary() {
    return this.block[this.rotation].some(
      (block) => Math.abs((block % config.noOfCols) + this.xPos) < 0
    );
  }

  goDown() {
    this.yPos++;
  }

  goLeft() {
    if (this.getShape().every((block) => block % config.noOfCols > 0)) {
      this.xPos--;
    }
  }

  goRight() {
    if (
      this.getShape().every(
        (block) => block % config.noOfCols < config.noOfCols - 1
      )
    ) {
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

  checkAgainstStackIfCanMoveDown(stackedBlocks: number[]): boolean {
    const shape = this.getShape();
    const canMoveDown = shape.every((block) => {
      return !stackedBlocks.includes(block + config.noOfCols);
    });
    return canMoveDown;
  }
}

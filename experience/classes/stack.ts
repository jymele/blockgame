import { config } from "@/utils/config";

export default class Stack {
  public list: number[] = [];
  public rowsToBreak: number[] = [];

  addToStack(block: number[]) {
    this.list.push(...block);
  }

  checkIfLineCanBeBroken() {
    for (let i = 0; i < config.noOfRows; i++) {
      const rowToCheck = this.getAllTilesInRow(i);
      const isFullRow = rowToCheck.every((tile) => {
        return this.list.includes(tile);
      });
      if (isFullRow) {
        this.rowsToBreak.push(i);
      }
    }
  }

  getAllTilesInRow(row: number) {
    const tilesInRow: number[] = [];

    for (let i = 0; i < config.noOfCols; i++) {
      tilesInRow.push(row * config.noOfCols + i);
    }

    return tilesInRow;
  }

  breakLines() {
    for (const row of this.rowsToBreak) {
      const tilesInRow = this.getAllTilesInRow(row);
      this.list = this.list.filter((tile) => !tilesInRow.includes(tile));
      this.reorganizeStack(row);
    }
    this.rowsToBreak = [];
  }

  reorganizeStack(rowbroken: number) {
    this.list = this.list.map((tile) => {
      return tile < rowbroken * config.noOfCols ? tile + config.noOfCols : tile;
    });
  }
}

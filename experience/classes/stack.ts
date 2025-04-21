import { config } from "@/utils/config";

export default class Stack {
  public list: number[] = [];
  public rowsToBreak: number[] = [];

  addToStack(block: number[]) {
    this.list.push(...block);
  }

  checkIfLineCanBeBroken() {
    const linesToBreak: number[] = [];

    for (let i = 0; i < config.noOfRows; i++) {
      const rowToCheck = this.getAllTilesInRow(i);
      const isFullRow = rowToCheck.every((tile) => {
        return this.list.includes(tile);
      });
      if (isFullRow) {
        linesToBreak.push(i);
      }
    }

    return linesToBreak;
  }

  getAllTilesInRow(row: number) {
    const tilesInRow: number[] = [];

    for (let i = 0; i < this.list.length; i++) {
      if (Math.floor(this.list[i] / config.noOfCols) === row) {
        tilesInRow.push(this.list[i]);
      }
    }

    return tilesInRow;
  }
}

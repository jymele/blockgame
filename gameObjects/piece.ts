import { config } from "@/utils/config";

const lPiece: number[][] = [
  [0, config.noOfCols, 2 * config.noOfCols, 3 * config.noOfCols],
  [-1, 0, 1, 2],
];

const oPiece: number[][] = [[0, 1, config.noOfCols, config.noOfCols + 1]];

const tPiece: number[][] = [
  [0, 1, 2, config.noOfCols + 1],
  [0, config.noOfCols, config.noOfCols + 1, 2 * config.noOfCols],
  [1, config.noOfCols, config.noOfCols + 1, config.noOfCols + 2],
  [1, config.noOfCols + 1, 2 * config.noOfCols + 1, config.noOfCols],
];

const zPiece: number[][] = [
  [0, 1, config.noOfCols + 1, config.noOfCols + 2],
  [1, config.noOfCols, config.noOfCols + 1, 2 * config.noOfCols],
  //   [0, 1, config.noOfCols + 1, config.noOfCols + 2],
  //   [1, config.noOfCols, config.noOfCols + 1, 2 * config.noOfCols],
];

const sPiece: number[][] = [
  [0, 1, config.noOfCols, config.noOfCols + 1],
  [1, config.noOfCols + 1, 2 * config.noOfCols, 2 * config.noOfCols + 1],
  //   [0, 1, config.noOfCols, config.noOfCols + 1],
  //   [1, config.noOfCols + 1, 2 * config.noOfCols, 2 * config.noOfCols + 1],
];

const iPiece: number[][] = [
  [0, config.noOfCols, 2 * config.noOfCols, 3 * config.noOfCols],
  [0, 1, 2, 3],
  [0, config.noOfCols, 2 * config.noOfCols, 3 * config.noOfCols],
  [0, 1, 2, 3],
];

const jPiece: number[][] = [
  [0, config.noOfCols, 2 * config.noOfCols, 2 * config.noOfCols - 1],
  [0, 1, 2, 2 + config.noOfCols],
  [0, 1, config.noOfCols, 2 * config.noOfCols],
  [0, config.noOfCols, config.noOfCols + 1, config.noOfCols + 2],
];

export function getBlockFromName(name: string): number[][] {
  switch (name) {
    case "l":
      return lPiece;
    case "o":
      return oPiece;
    case "t":
      return tPiece;
    case "z":
      return zPiece;
    case "s":
      return sPiece;
    case "i":
      return iPiece;
    case "j":
      return jPiece;
    default:
      throw new Error("Unknown block type");
  }
}

export const allBlocks: string[] = ["l", "o", "t", "z", "s", "i", "j"];

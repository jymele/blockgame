"use client";
import { config } from "@/utils/config";

export default function GameBoard() {
  return (
    <div className="game-board">
      <div
        className={`p-2 shadow rounded-lg w-fit gap-2 grid ` + `grid-cols-12`}
      >
        {Array.from(
          { length: config.noOfRows * config.noOfCols },
          (_, index) => (
            <div key={index} className="tile"></div>
          )
        )}
      </div>
    </div>
  );
}

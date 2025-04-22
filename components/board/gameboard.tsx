"use client";
import { config } from "@/utils/config";
import clsx from "clsx";

type GameBoardProps = {
  blockShape?: number[];
  stackedBlocks?: number[];
};

export default function GameBoard(props: GameBoardProps) {
  const { blockShape, stackedBlocks } = props;

  const tiles = [...Array(config.noOfRows * config.noOfCols).keys()].map(
    (i) => i
  );

  return (
    <div className="game-board bg-white">
      <div
        className={"p-1 md:p-2 shadow rounded-lg gap-1 grid w-fit mx-auto"}
        style={{ gridTemplateColumns: `repeat(${config.noOfCols}, 1fr)` }}
      >
        {tiles.map((tiles, index) => (
          <div
            key={index}
            className={clsx("tile", [
              blockShape?.includes(index) && "bg-pink-600",
              stackedBlocks?.includes(index) && "bg-blue-600 taken",
            ])}
          />
        ))}
      </div>
    </div>
  );
}

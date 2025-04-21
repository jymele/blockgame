"use client";
import { config } from "@/utils/config";
import { useEffect, useState } from "react";
import clsx from "clsx";

type GameBoardProps = {
  blockShape?: number[];
  stackedBlocks?: number[];
  yPos?: number;
  xPos?: number;
};

export default function GameBoard(props: GameBoardProps) {
  const { blockShape, yPos, xPos } = props;

  const tiles = [...Array(config.noOfRows * config.noOfCols).keys()].map(
    (i) => i
  );

  return (
    <div className="game-board">
      <div
        className={"p-2 shadow rounded-lg gap-1 grid w-fit mx-auto"}
        style={{ gridTemplateColumns: `repeat(${config.noOfCols}, 1fr)` }}
      >
        {tiles.map((tiles, index) => (
          <div
            key={index}
            className={clsx("tile", [
              blockShape?.includes(index) ? "bg-pink-600" : "empty",
            ])}
          />
        ))}
      </div>
    </div>
  );
}

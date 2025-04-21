"use client";
import { config } from "@/utils/config";
import { Tile } from "@/types/tile";
import { Coordinate } from "@/types/coordinate";
import { useEffect, useState } from "react";
import clsx from "clsx";

type GameBoardProps = {
  block?: Coordinate[];
  coord: Coordinate;
};

export default function GameBoard(props: GameBoardProps) {
  const { block, coord } = props;

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
          <div key={index} className={clsx("tile bg-pink-400", [])} />
        ))}
      </div>
    </div>
  );
}

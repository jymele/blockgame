"use client";
import { config } from "@/utils/config";
import { Tile } from "@/types/tile";
import { useEffect, useState } from "react";
import clsx from "clsx";

type GameBoardProps = {
  block?: Tile[];
};

export default function GameBoard(props: GameBoardProps) {
  //   const { block } = props;

  const block: Tile[] = [
    { x: 1, y: 1, color: "red" },
    { x: 1, y: 2, color: "blue" },
    { x: 2, y: 1, color: "green" },
    { x: 2, y: 2, color: "yellow" },
  ];

  const rows = [...Array(config.noOfRows).keys()].map((i) => i + 1);
  const ys: number[] = block.map((tile) => tile.y);

  return (
    <div className="game-board">
      <div
        className={"p-2 shadow rounded-lg gap-1 grid grid-cols-1 w-fit mx-auto"}
      >
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${config.noOfCols}, 1fr)` }}
          >
            {ys.includes(index) ? <Row block={block} /> : <Row />}
          </div>
        ))}
      </div>
    </div>
  );
}

type RowProps = {
  block?: Tile[];
};

function Row(props: RowProps) {
  const { block } = props;

  const cols = [...Array(config.noOfCols).keys()].map((i) => i + 1);
  const xs: number[] = block ? block.map((tile) => tile.x) : [];
  /**
   * * This function creates a row of tiles in the game board.
   * * It uses the `config` object to determine the number of columns.
   */

  return (
    <>
      {cols.map((col, index) => (
        <div
          key={index}
          className={clsx("tile", [xs.includes(index) && "active"])} // Add your tile styles here
        ></div>
      ))}
    </>
  );
}

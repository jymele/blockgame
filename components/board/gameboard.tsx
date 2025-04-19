"use client";
import { config } from "@/utils/config";
import { Tile } from "@/types/tile";
import { Coordinate } from "@/types/coordinate";
import { useEffect, useState } from "react";
import clsx from "clsx";

type GameBoardProps = {
  block?: Tile[];
  coord: Coordinate;
};

export default function GameBoard(props: GameBoardProps) {
  const { block, coord } = props;

  const rows = [...Array(config.noOfRows).keys()].map((i) => i);
  const ys: number[] | undefined = block?.map((tile) => tile.y + coord.y);

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
            {ys?.includes(index) ? (
              <Row block={block} coord={coord} />
            ) : (
              <Row coord={coord} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type RowProps = {
  block?: Tile[];
  coord: Coordinate;
};

function Row(props: RowProps) {
  const { block, coord } = props;

  const cols = [...Array(config.noOfCols).keys()].map((i) => i);
  const xs: number[] = block ? block.map((tile) => tile.x + coord.x) : [];
  /**
   * * This function creates a row of tiles in the game board.
   * * It uses the `config` object to determine the number of columns.
   */

  return (
    <>
      {cols.map((col, index) => (
        <div
          key={index}
          className={clsx("tile", [xs?.includes(index) && "active"])} // Add your tile styles here
        ></div>
      ))}
    </>
  );
}

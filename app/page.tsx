"use client";
import GameBoard from "@/components/board/gameboard";
import { Coordinate } from "@/types/coordinate";
import { Tile } from "@/types/tile";
import { useState, useEffect } from "react";

import { lPiece } from "@/pieces/l";

export default function Home() {
  const [coord, setCoord] = useState<Coordinate>({ x: 0, y: 0 });

  const block: Coordinate[] = lPiece[0];

  return (
    <main>
      <GameBoard block={block} coord={coord} />
    </main>
  );
}

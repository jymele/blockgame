import GameBoard from "@/components/board/gameboard";
import { Coordinate } from "@/types/coordinate";
import { Tile } from "@/types/tile";

export default function Home() {
  const coord: Coordinate = { x: 0, y: 0 };

  const block: Tile[] = [
    { x: 0, y: 0, color: "red" },
    { x: 0, y: 1, color: "blue" },
    { x: 1, y: 0, color: "green" },
    { x: 1, y: 1, color: "yellow" },
  ];

  return (
    <main>
      <GameBoard block={block} coord={coord} />
    </main>
  );
}

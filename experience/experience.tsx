"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState } from "react";
import Block from "./classes/block";

export default function Experience() {
  const [block, setBlock] = useState<Block>(new Block());

  useEffect(() => {}, [block]);

  return <GameBoard blockShape={block.getShape()} />;
}

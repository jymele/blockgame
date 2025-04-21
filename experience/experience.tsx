"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState } from "react";
import { animate } from "animejs";
import Block from "./classes/block";

export default function Experience() {
  //   const [block, setBlock] = useState<Block>(new Block());
  //   const block = new Block();
  const [blockShape, setBlockShape] = useState<number[]>([]);

  useEffect(() => {
    const block = new Block();

    const animation = animate(".tile", {
      loop: true,
      fps: 1,
      duration: 1000,
      onUpdate: () => {
        block.goDown();
        setBlockShape(block.getShape());
      },
    });
  }, []);

  return <GameBoard blockShape={blockShape} />;
}

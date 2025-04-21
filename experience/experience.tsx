"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState } from "react";
import { createTimer } from "animejs";
import Block from "./classes/block";

export default function Experience() {
  const [blockShape, setBlockShape] = useState<number[]>([]);

  useEffect(() => {
    const block = new Block();

    createTimer({
      loop: true,
      frameRate: 1,
      onUpdate: () => {
        if (!block.checkIfCanMoveDown()) {
          // Block cannot move down, stop the timer
          return false;
        }
        block.goDown();
        setBlockShape(block.getShape());
      },
    });
  }, []);

  return <GameBoard blockShape={blockShape} />;
}

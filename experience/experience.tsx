"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState } from "react";
import { createTimer } from "animejs";
import Block from "./classes/block";

export default function Experience() {
  const [blockShape, setBlockShape] = useState<number[]>([]);

  let block: Block;

  useEffect(() => {
    block = new Block();
    document.addEventListener("keydown", handleKeyPress);

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

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // Stop the timer when the component unmounts
    };
  }, []);

  function handleKeyPress(event: KeyboardEvent) {
    console.log(event.code);

    if (event.code == "ArrowLeft") {
      block.goLeft();
    }
    if (event.code == "ArrowRight") {
      block.goRight();
    }
    if (event.code == "ArrowDown") {
      block.goDown();
    }
    if (event.code == "Space") {
      block.rotate();
    }

    setBlockShape(block.getShape());
  }

  return <GameBoard blockShape={blockShape} />;
}

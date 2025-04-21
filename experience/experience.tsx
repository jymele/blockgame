"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer } from "animejs";
import Block from "./classes/block";

export default function Experience() {
  const [blockShape, setBlockShape] = useState<number[]>([]);

  const block = useRef<Block | null>(null);
  const timer = useRef<Timer | null>(null);

  useEffect(() => {
    block.current = new Block();
    document.addEventListener("keydown", handleKeyPress);

    timer.current = createTimer({
      loop: true,
      frameRate: 1,
      onUpdate: () => {
        if (!block.current?.checkIfCanMoveDown()) {
          // Block cannot move down, stop the timer
          return false;
        }
        block.current?.goDown();
        setBlockShape(block.current?.getShape());
      },
    });

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // Stop the timer when the component unmounts
      timer.current?.pause();
    };
  }, []);

  function handleKeyPress(event: KeyboardEvent) {
    console.log(event.code);

    if (event.code == "ArrowLeft") {
      block.current?.goLeft();
    }
    if (event.code == "ArrowRight") {
      block.current?.goRight();
    }
    if (event.code == "ArrowDown") {
      block.current?.goDown();
    }
    if (event.code == "Space") {
      block.current?.rotate();
    }
    if (block.current) {
      setBlockShape(block.current.getShape());
    }
  }

  return <GameBoard blockShape={blockShape} />;
}

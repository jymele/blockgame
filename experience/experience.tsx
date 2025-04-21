"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer } from "animejs";
import Block from "./classes/block";
import Stack from "./classes/stack";

export default function Experience() {
  const [blockShape, setBlockShape] = useState<number[]>([]);
  const [stackedBlocks, setStackedBlocks] = useState<number[]>([]);

  const block = useRef<Block | null>(null);
  const stack = useRef<Stack | null>(null);
  const timer = useRef<Timer | null>(null);

  useEffect(() => {
    block.current = new Block();
    stack.current = new Stack();

    document.addEventListener("keydown", handleKeyPress);

    timer.current = createTimer({
      loop: true,
      frameRate: 1,
      onUpdate: () => {
        downAction();
      },
    });

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // Stop the timer when the component unmounts
      timer.current?.pause();
    };
  }, []);

  function handleKeyPress(event: KeyboardEvent) {
    if (event.code == "ArrowLeft") {
      block.current?.goLeft();
    }
    if (event.code == "ArrowRight") {
      block.current?.goRight();
    }
    if (event.code == "ArrowDown") {
      downAction();
    }
    if (event.code == "Space") {
      block.current?.rotate();
    }
    if (block.current) {
      setBlockShape(block.current.getShape());
    }
  }

  function downAction() {
    if (block.current?.checkIfCanMoveDown()) {
      block.current?.goDown();
      setBlockShape(block.current?.getShape());
    } else {
      // Add the current block to the stacked blocks
      stack.current?.addToStack(block.current?.getShape() || []);
      setStackedBlocks(stack.current?.list || []);
      block.current?.getNextBlock();
    }
  }

  return (
    <>
      <GameBoard blockShape={blockShape} stackedBlocks={stackedBlocks} />
    </>
  );
}

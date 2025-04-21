"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer } from "animejs";
import Block from "./classes/block";
import Stack from "./classes/stack";
import NextBlock from "@/components/board/nextblock";
import TouchControls from "@/components/touch-controls";

export default function Experience() {
  const [blockShape, setBlockShape] = useState<number[]>([]);

  const block = useRef<Block | null>(null);
  const stack = useRef<Stack | null>(null);
  const timer = useRef<Timer | null>(null);
  const stackedBlocksRef = useRef<number[]>([]);

  useEffect(() => {
    block.current = new Block();
    stack.current = new Stack();
    stackedBlocksRef.current = [];

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
      leftAction();
    }
    if (event.code == "ArrowRight") {
      rightAction();
    }
    if (event.code == "ArrowDown") {
      downAction();
    }
    if (event.code == "Space") {
      rotateAction();
    }
  }

  function downAction() {
    if (
      block.current?.checkIfCanMoveDown() &&
      block.current?.checkAgainstStackIfCanMoveDown(stackedBlocksRef.current)
    ) {
      block.current?.goDown();
      setBlockShape(block.current?.getShape());
    } else {
      // Add the current block to the stacked blocks
      stack.current?.addToStack(block.current?.getShape() || []);
      stackedBlocksRef.current = stack.current!.list;
      block.current?.getNextBlock();

      // Check if a line can be broken
      stack.current?.checkIfLineCanBeBroken();
    }
  }

  function leftAction() {
    block.current?.goLeft(stack.current!);
    if (block.current) {
      setBlockShape(block.current.getShape());
    }
  }

  function rightAction() {
    block.current?.goRight(stack.current!);
    if (block.current) {
      setBlockShape(block.current.getShape());
    }
  }

  function rotateAction() {
    block.current?.rotate();
    if (block.current) {
      setBlockShape(block.current.getShape());
    }
  }

  return (
    <>
      <div className="flex justify-between gap-4 mx-auto ">
        <div>Score</div>
        <NextBlock block={block.current?.nextBlock} />
      </div>
      <GameBoard
        blockShape={blockShape}
        stackedBlocks={stackedBlocksRef.current}
      />
      <div>Rows to break: {stack.current?.rowsToBreak.length}</div>

      <TouchControls
        downTrigger={downAction}
        leftTrigger={leftAction}
        rightTrigger={rightAction}
        rotateTrigger={rotateAction}
      />
    </>
  );
}

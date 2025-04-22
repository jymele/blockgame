"use client";
import GameBoard from "@/components/board/gameboard";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer } from "animejs";
import Block from "./classes/block";
import Stack from "./classes/stack";
import NextBlock from "@/components/board/nextblock";
import TouchControls from "@/components/touch-controls";
import ScoreBoard from "@/components/score/scoreboard";

export default function Experience() {
  const [blockShape, setBlockShape] = useState<number[]>([]);
  const [linesbroken, setLinesBroken] = useState(0);

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

      // send the 0 line value to the score. This way, if thesame number of lines is broken a second time, it will actually update the score

      setLinesBroken(0);
    } else {
      // Add the current block to the stacked blocks
      stack.current?.addToStack(block.current?.getShape() || []);
      stackedBlocksRef.current = stack.current!.list;
      block.current?.getNextBlock();

      // Check if a line can be broken
      stack.current?.checkIfLineCanBeBroken();

      if (stack.current?.rowsToBreak.length) {
        // Let the score component know how many rows were broken at once
        setLinesBroken(stack.current.rowsToBreak.length);

        // Break the lines
        stack.current?.breakLines();
        stackedBlocksRef.current = stack.current!.list;
      }
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
        <ScoreBoard linesBroken={linesbroken} />
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

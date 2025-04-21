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
    }
  }

  function leftAction() {
    block.current?.goLeft();
    if (block.current) {
      setBlockShape(block.current.getShape());
    }
  }

  function rightAction() {
    block.current?.goRight();
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
      <div>
        <TouchControls
          downTrigger={downAction}
          leftTrigger={leftAction}
          rightTrigger={rightAction}
          rotateTrigger={rotateAction}
        />
        {/* <div className="flex justify-center gap-4 mt-4">
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onMouseDown={() => {
              const interval = setInterval(() => {
                block.current?.goLeft();
                if (block.current) {
                  setBlockShape(block.current.getShape());
                }
              }, 100); // Adjust the interval as needed
              document.addEventListener(
                "mouseup",
                () => clearInterval(interval),
                { once: true }
              );
              document.addEventListener(
                "mouseleave",
                () => clearInterval(interval),
                { once: true }
              );
            }}
          >
            Left
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => {
              block.current?.goRight();
              if (block.current) {
                setBlockShape(block.current.getShape());
              }
            }}
          >
            Right
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => {
              downAction();
            }}
          >
            Down
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => {
              block.current?.rotate();
              if (block.current) {
                setBlockShape(block.current.getShape());
              }
            }}
          >
            Rotate
          </button>
        </div> */}
      </div>
    </>
  );
}

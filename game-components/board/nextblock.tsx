"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

type NextBlockProps = {
  block?: string;
};

const rows = 3;
const columns = 4;

const oDisplay: number[] = [1, 2, columns + 1, columns + 2];
const iDisplay: number[] = [0, 1, 2, 3];
const tDisplay: number[] = [1, columns, columns + 1, columns + 2];
const lDisplay: number[] = [columns, columns + 1, columns + 2, 2];
const jDisplay: number[] = [0, columns, columns + 1, columns + 2];
const sDisplay: number[] = [1, columns, columns + 1, columns + 2];
const zDisplay: number[] = [0, columns, columns + 1, columns + 2];

export default function NextBlock(props: NextBlockProps) {
  const { block } = props;
  const numbers = Array.from({ length: rows * columns }, (_, i) => i + 1);
  const [blockShape, setBlockShape] = useState<number[]>([]);

  useEffect(() => {
    switch (block) {
      case "o":
        setBlockShape(oDisplay);
        break;
      case "i":
        setBlockShape(iDisplay);
        break;
      case "t":
        setBlockShape(tDisplay);
        break;
      case "l":
        setBlockShape(lDisplay);
        break;
      case "j":
        setBlockShape(jDisplay);
        break;
      case "s":
        setBlockShape(sDisplay);
        break;
      case "z":
        setBlockShape(zDisplay);
        break;
      default:
        setBlockShape([]); // Clear the shape if block is not recognized
    }
  }, [block]);

  return (
    <div>
      {/* Next Block: {block} */}
      <p>Next block</p>
      <div className="grid bg-white grid-cols-4 w-fit rounded gap-1 shadow p-2">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={clsx([
              "next-tile",
              blockShape.includes(index) ? "active-tile" : "",
            ])}
          ></div>
        ))}
      </div>
    </div>
  );
}

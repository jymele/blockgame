"use client";
import React, { useState, useEffect } from "react";

type ScoreBoardProps = {
  linesBroken: number;
};

export default function ScoreBoard(props: ScoreBoardProps) {
  const { linesBroken } = props;
  const [score, setScore] = useState(0);
  const [scoreAdded, setScoreAdded] = useState(0);

  useEffect(() => {
    // Calculate score based on lines broken
    const calculateScore = (lines: number) => {
      return lines > 1 ? 125 * lines : lines * 100;
    };

    setScore((prev) => prev + calculateScore(linesBroken));
  }, [linesBroken]);

  return (
    <>
      <div className="p-2 relative bg-slate-900 text-slate-50 shadow-sm rounded flex items-center justify-center min-w-52">
        <span>Score: {score}</span>
        <span className="absolute font-semibold text-green-400 -right-8 ">
          +{scoreAdded}
        </span>
      </div>
    </>
  );
}

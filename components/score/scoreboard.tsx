"use client";
import React, { useState, useEffect } from "react";
import { animate } from "animejs";

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

    if (linesBroken === 0) return;
    // Animate the score added
    animate(".scoreAdded", {
      y: [
        { from: 20, to: 0, duration: 200 },
        { from: 0, to: -20, duration: 200, delay: 100 },
      ],
      opacity: [
        { from: 0, to: 1, duration: 250 },
        { from: 1, to: 0, duration: 250, delay: 100 },
      ],
      onBegin: () => {
        setScoreAdded(calculateScore(linesBroken));
      },
      onComplete: () => {
        setScoreAdded(0);
        setScore((prev) => prev + calculateScore(linesBroken));
      },
    });
  }, [linesBroken]);

  return (
    <>
      <div className="p-2 relative bg-slate-900 text-slate-50 shadow-sm rounded flex items-center justify-center min-w-52">
        <span>Score: {score}</span>
        <span className="scoreAdded absolute opacity-0 font-semibold text-green-400 -right-8 ">
          +{scoreAdded}
        </span>
      </div>
    </>
  );
}

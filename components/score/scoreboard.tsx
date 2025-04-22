"use client";
import React, { useState, useEffect } from "react";

type ScoreBoardProps = {
  linesBroken: number;
};

export default function ScoreBoard(props: ScoreBoardProps) {
  const { linesBroken } = props;
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Calculate score based on lines broken
    const calculateScore = (lines: number) => {
      // Example scoring logic: 100 points per line broken
      return lines * 100;
    };

    setScore((prev) => prev + calculateScore(linesBroken));
  }, [linesBroken]);

  return <div>Score: {score}</div>;
}

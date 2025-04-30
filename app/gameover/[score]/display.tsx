"use client";

export default function ScoreDisplay({ score }: { score: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">Game Over</h1>
      <p className="text-2xl">Your Score: {score}</p>
    </div>
  );
}

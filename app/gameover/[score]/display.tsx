"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ScoreDisplay({ score }: { score: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">Game Over</h1>
      <p className="text-2xl">Your Score: {score}</p>
      <Button asChild>
        <Link
          href={"/game"}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </Link>
      </Button>
    </div>
  );
}

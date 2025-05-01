import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-lvh flex justify-center items-center">
      <Button asChild>
        <Link href={"game"}>Start Playing</Link>
      </Button>
    </main>
  );
}

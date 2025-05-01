import Link from "next/link";
// import Experience from "@/experience/experience";

export default function Home() {
  return (
    <main className="h-lvh flex justify-center items-center">
      {/* <Experience /> */}
      <Link
        className="bg-slate-900 text-slate-50 transition duration-200 hover:bg-slate-700 px-6 py-1 rounded-md text-lg tracking-tight"
        href={"game"}
      >
        Play
      </Link>
    </main>
  );
}

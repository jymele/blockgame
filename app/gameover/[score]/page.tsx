import ScoreDisplay from "./display";

export default async function Page({ params }: { params: { score: string } }) {
  const { score } = await params;

  return (
    <>
      <ScoreDisplay score={score} />
    </>
  );
}

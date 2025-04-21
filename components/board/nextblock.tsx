import { useEffect } from "react";

type NextBlockProps = {
  block?: string;
};

export default function NextBlock(props: NextBlockProps) {
  const rows = 3;
  const columns = 4;
  const { block } = props;
  const numbers = Array.from({ length: rows * columns }, (_, i) => i + 1);

  useEffect(() => {
    // This effect runs when the block prop changes
    // console.log("Next block changed:", block);
  }, [block]);

  return (
    <>
      <div className="grid grid-cols-4 w-fit rounded shadow p-2">
        {numbers.map((number) => (
          <div key={number} className="tile"></div>
        ))}
      </div>
      Next Block: {block}
    </>
  );
}

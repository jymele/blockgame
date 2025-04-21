// import eventEmitter from "@/utils/eventEmitter";

type Props = {
  downTrigger: () => void;
  leftTrigger: () => void;
  rightTrigger: () => void;
  rotateTrigger: () => void;
};

export default function TouchControls(props: Props) {
  const { downTrigger, leftTrigger, rightTrigger, rotateTrigger } = props;

  const performAction = (action: () => void) => {
    const interval = setInterval(() => {
      action();
    }, 50); // Adjust the interval as needed
    document.addEventListener("mouseup", () => clearInterval(interval), {
      once: true,
    });
    document.addEventListener("mouseleave", () => clearInterval(interval), {
      once: true,
    });
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onMouseDown={() => {
          performAction(leftTrigger);
        }}
      >
        Left
      </button>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onMouseDown={() => {
          performAction(rightTrigger);
        }}
      >
        Right
      </button>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onMouseDown={() => {
          performAction(downTrigger);
        }}
      >
        Down
      </button>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onMouseDown={() => {
          performAction(rotateTrigger);
        }}
      >
        Rotate
      </button>
    </div>
  );
}

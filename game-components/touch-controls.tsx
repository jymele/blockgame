// import eventEmitter from "@/utils/eventEmitter";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigDown,
  RefreshCcw,
} from "lucide-react";

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
    }, 80); // Adjust the interval as needed
    document.addEventListener("touchend", () => clearInterval(interval), {
      once: true,
    });
    document.addEventListener("touchend", () => clearInterval(interval), {
      once: true,
    });
  };

  return (
    <div className="flex justify-between gap-4 mt-4 lg:hidden">
      <div className="flex justify-between gap-2">
        <button
          className="controls"
          onTouchStart={() => {
            performAction(leftTrigger);
          }}
        >
          <ArrowBigLeft />
        </button>
        <button
          className="controls mt-12 "
          onTouchStart={() => {
            performAction(downTrigger);
          }}
        >
          <ArrowBigDown />
        </button>
        <button
          className="controls"
          onTouchStart={() => {
            performAction(rightTrigger);
          }}
        >
          <ArrowBigRight />
        </button>
      </div>

      <button
        className="controls"
        onTouchStart={() => {
          performAction(rotateTrigger);
        }}
      >
        <RefreshCcw />
      </button>
    </div>
  );
}

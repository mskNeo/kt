import { useMemo } from "react";
import "styles/Pixel.css";

export default function Pixel({
  pos,
  vel,
}: {
  pos: [number, number];
  vel: [number, number];
}) {
  const shiftedXPos = useMemo(() => pos[0] + Math.random() * 6 - 3, [pos]);
  const shiftedYPos = useMemo(() => pos[1] + Math.random() * 6 - 3, [pos]);
  const translateX = useMemo(() => vel[0] * 20, [vel]);
  const translateY = useMemo(() => vel[1] * 30, [vel]);

  return (
    <div
      className="pixel"
      style={
        {
          position: "absolute",
          top: shiftedYPos,
          left: shiftedXPos,
          "--translate-x-distance": translateX,
          "--translate-y-distance": translateY,
        } as React.CSSProperties
      }
    ></div>
  );
}

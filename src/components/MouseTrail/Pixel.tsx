import { useMemo } from "react";
import "styles/Pixel.css";

export default function Pixel({
  posX,
  posY,
  xVelocity,
  yVelocity,
}: {
  posX: number;
  posY: number;
  xVelocity: number;
  yVelocity: number;
}) {
  const shiftedYPos = useMemo(() => posY + Math.random() * 6 - 3, [posY]);
  const shiftedXPos = useMemo(() => posX + Math.random() * 6 - 3, [posX]);
  const translateX = useMemo(() => xVelocity * 20, [xVelocity]);
  const translateY = useMemo(() => yVelocity * 30, [yVelocity]);

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

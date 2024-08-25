import "styles/Pixel.css";

export default function Pixel({
  pos,
  vel,
}: {
  pos: [number, number];
  vel: [number, number];
}) {
  const shiftedXPos = pos[0] + Math.random() * 6 - 3;
  const shiftedYPos = pos[1] + Math.random() * 6 - 3;
  const translateX = vel[0] * Math.random() * 50;
  const translateY = vel[1] * Math.random() * 50;

  return (
    <div
      className="pixel"
      style={
        {
          top: shiftedYPos,
          left: shiftedXPos,
          "--translate-x-distance": translateX,
          "--translate-y-distance": translateY,
        } as React.CSSProperties
      }
    ></div>
  );
}

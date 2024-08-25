import { RefObject, useCallback, useEffect, useState } from "react";
import Pixel from "./Pixel";

export default function MouseTrail({
  parentRef,
}: {
  parentRef: RefObject<HTMLElement>;
}) {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [mousePixels, setMousePixels] = useState<JSX.Element[]>([]);
  const [mouseVelocity, setMouseVelocity] = useState<[number, number]>([1, 1]);

  const onMouseMove = (event: MouseEvent) => {
    setMousePosition([event.clientX, event.clientY]);
  };

  useEffect(() => {
    const parentContainer = parentRef?.current;
    parentContainer?.addEventListener("mousemove", onMouseMove);

    return () => {
      parentContainer?.removeEventListener("mousemove", onMouseMove);
    };
  }, [parentRef]);

  useEffect(() => {
    // calculate new mouse velocity (just see if moving up, down, left, right)
    setMouseVelocity(() => {
      const randomX = Math.round(Math.random());
      const randomY = Math.round(Math.random());
      const xDir = randomX === 0 ? -1 : 1;
      const yDir = randomY === 0 ? -1 : 1;
      return [xDir, yDir];
    });
  }, [mousePosition]);

  const createMouseTrail = useCallback(() => {
    const random = Math.random() * 100;

    // create new pixel
    const newPixel = (
      <Pixel key={random} pos={mousePosition} vel={mouseVelocity} />
    );

    // add pixel to array
    setMousePixels((pixels) => pixels.concat(newPixel));

    // remove oldest pixel after 1 second (1000 milliseconds)
    setTimeout(() => {
      setMousePixels((pixels) => pixels.slice(1));
    }, 950);
  }, [mousePosition, mouseVelocity]);

  useEffect(createMouseTrail, [createMouseTrail]);

  return <div id="mouse-trail">{mousePixels}</div>;
}

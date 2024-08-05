import { useCallback, useEffect, useState } from "react";
import Pixel from "./Pixel";

const pixelCadence = 4; // capture 1 pixel out of <pixelCadence> pixels

export default function MouseTrail({
  mousePosition,
}: {
  mousePosition: [number, number];
}) {
  const [mousePixels, setMousePixels] = useState<JSX.Element[]>([]);
  const [mouseVelocity, setMouseVelocity] = useState<[number, number]>([1, 1]);
  const [pixelCadenceCount, setPixelCadenceCount] = useState(0);

  useEffect(() => {
    // calculate new mouse velocity (just see if moving up, down, left, right)
    setMouseVelocity((prev) => {
      const randomY = Math.round(Math.random());
      const yDir = randomY === 0 ? -1 : 1;
      return [prev[0] * -1, yDir];
    });

    setPixelCadenceCount((count) => (count + 1) % pixelCadence);
  }, [mousePosition]);

  const createMouseTrail = useCallback(() => {
    if (pixelCadenceCount === 0) {
      const random = Math.random() * 10000;

      // create new pixel
      const newPixel = (
        <Pixel key={random} pos={mousePosition} vel={mouseVelocity} />
      );

      // add pixel to array
      setMousePixels((pixels) => pixels.concat(newPixel));

      // remove oldest pixel after 1 second (1000 milliseconds)
      setTimeout(() => {
        setMousePixels((pixels) => pixels.slice(1));
      }, 1000);
    }
  }, [mousePosition, mouseVelocity, pixelCadenceCount]);

  useEffect(createMouseTrail, [createMouseTrail]);

  return <div id="mouse-trail">{mousePixels}</div>;
}

import Book from "./Book/Book";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { isOpenAtom } from "store/BookStore";
import { useAtom } from "jotai";

export default function SceneCanvas() {
  const [open] = useAtom(isOpenAtom);
  return (
    <Canvas shadows>
      <Book />
      {open && <OrbitControls />}
      <Environment preset="warehouse" />
    </Canvas>
  );
}

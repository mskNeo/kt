import React from "react";
import Book, { MemoBook } from "./Book/Book";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

export default function SceneCanvas() {
  return (
    <Canvas shadows>
      <Book />
      {/* <MemoBook /> */}
      {/* <OrbitControls /> */}
      <Environment preset="warehouse" />
    </Canvas>
  );
}

export const MemoCanvas = React.memo(SceneCanvas);

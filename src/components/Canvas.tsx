import React from "react";
import { MemoBook } from "./Book/Book";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

function SceneCanvas() {
  return (
    <Canvas shadows>
      <MemoBook />
      <OrbitControls />
      <Environment preset="studio" />
    </Canvas>
  );
}

export const MemoCanvas = React.memo(SceneCanvas);

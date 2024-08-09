import React from "react";
import { Canvas } from "@react-three/fiber";
import { MemoBox } from "./Box";

export const MemoCanvas = React.memo(() => {
  return (
    <>
      <Canvas frameloop="demand">
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <MemoBox position={[-1.2, 0, 0]} />
        <MemoBox position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
});

import React, { forwardRef } from "react";
import "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { SpineGeometry } from "components/Geometries/Spine";
import { useTexture } from "@react-three/drei";

const Spine = forwardRef((props, ref: React.Ref<Group<Object3DEventMap>>) => {
  const colorMap = useTexture("textures/fabric_leather_uv_img.jpg");
  // const maps = useTexture({
  //   map: "textures/fabric_leather_02_diff_1k.jpg",
  //   // displacementMap: "textures/fabric_leather_02_diff_1k.jpg",
  //   roughnessMap: "textures/fabric_leather_02_rough_1k-min.jpg",
  // });

  return (
    <group {...props} ref={ref}>
      <mesh geometry={SpineGeometry}>
        <meshStandardMaterial map={colorMap} color="#004a3a" />
      </mesh>
    </group>
  );
});

export const MemoSpine = React.memo(Spine);

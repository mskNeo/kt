import React, { forwardRef } from "react";
import "@react-three/fiber";
import { Group, Object3DEventMap } from "three";
import { SpineGeometry } from "components/Geometries/Spine";
import { useTexture } from "@react-three/drei";
import { COVER_COLOR } from "constants/three";

const Spine = forwardRef((props, ref: React.Ref<Group<Object3DEventMap>>) => {
  const textureMap = useTexture("textures/fabric_leather_02_rough_1k-min.jpg");

  return (
    <group {...props} ref={ref}>
      <mesh geometry={SpineGeometry}>
        <meshStandardMaterial
          map={textureMap}
          roughnessMap={textureMap}
          color={COVER_COLOR}
        />
      </mesh>
    </group>
  );
});

export const MemoSpine = React.memo(Spine);

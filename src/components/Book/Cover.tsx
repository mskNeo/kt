import React, { forwardRef } from "react";
import "@react-three/fiber";
import { Group } from "three";
import { CoverGeometry } from "components/Geometries/Cover";
import { useTexture } from "@react-three/drei";
import { COVER_COLOR } from "constants/three";

const Cover = forwardRef((props, ref: React.Ref<Group>) => {
  const textureMap = useTexture("textures/fabric_leather_02_rough_1k-min.jpg");

  return (
    <group {...props} ref={ref}>
      <mesh geometry={CoverGeometry}>
        <meshStandardMaterial
          map={textureMap}
          roughnessMap={textureMap}
          color={COVER_COLOR}
        />
      </mesh>
    </group>
  );
});

export const MemoCover = React.memo(Cover);

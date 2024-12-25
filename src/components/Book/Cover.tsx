import React, { forwardRef } from "react";
import "@react-three/fiber";
import { Group } from "three";
import {
  BackCoverGeometry,
  FrontCoverGeometry,
} from "components/Geometries/Cover";
import { useTexture } from "@react-three/drei";

const Cover = forwardRef(
  (props: { isFront: boolean }, ref: React.Ref<Group>) => {
    const colorMap = useTexture("textures/fabric_leather_uv_img.jpg");
    // const maps = useTexture({
    //   map: "textures/fabric_leather_02_diff_1k.jpg",
    //   // displacementMap: "textures/fabric_leather_02_diff_1k.jpg",
    //   roughnessMap: "textures/fabric_leather_02_rough_1k-min.jpg",
    // });

    return (
      <group {...props} ref={ref}>
        <mesh geometry={props.isFront ? FrontCoverGeometry : BackCoverGeometry}>
          <meshStandardMaterial map={colorMap} color="#004a3a" />
        </mesh>
      </group>
    );
  }
);

export const MemoCover = React.memo(Cover);

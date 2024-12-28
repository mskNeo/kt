import React, { forwardRef, useMemo } from "react";
import "@react-three/fiber";
import { PageGeometry, pageMaterials } from "../Geometries/Page";
import { BOOK_PAGE_SEGMENT_WIDTH, BOOK_PAGE_SEGMENTS } from "constants/three";
import {
  Bone,
  BoxGeometry,
  MeshBasicMaterial,
  Object3DEventMap,
  Skeleton,
  SkinnedMesh,
} from "three";

export const PageSet = forwardRef(
  (
    props,
    ref: React.Ref<
      SkinnedMesh<BoxGeometry, MeshBasicMaterial[], Object3DEventMap>
    >
  ) => {
    const manualSkinnedMesh = useMemo(() => {
      const bones = [];

      for (let i = 0; i <= BOOK_PAGE_SEGMENTS; i++) {
        let bone = new Bone();
        bone.position.x = i === 0 ? 0 : BOOK_PAGE_SEGMENT_WIDTH;
        bones.push(bone);

        if (i > 0) bones[i - 1].add(bone); // attach the new bone to the previous one
      }

      const skeleton = new Skeleton(bones);

      const materials = pageMaterials;
      const skinMesh = new SkinnedMesh(PageGeometry, materials);
      skinMesh.castShadow = true;
      skinMesh.receiveShadow = true;
      skinMesh.frustumCulled = false;
      skinMesh.add(skeleton.bones[0]);
      skinMesh.bind(skeleton);
      return skinMesh;
    }, []);

    return (
      <group {...props}>
        <primitive object={manualSkinnedMesh} ref={ref} />
      </group>
    );
  }
);

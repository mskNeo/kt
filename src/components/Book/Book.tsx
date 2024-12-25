import React, { useEffect, useMemo, useRef } from "react";
import "@react-three/fiber";
import { MemoCover } from "./Cover";
import { MemoPage } from "./Page";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  Group,
  MathUtils,
  Matrix4,
  MeshBasicMaterial,
  Object3DEventMap,
  SkinnedMesh,
} from "three";
import { useAtom } from "jotai";
import { isOpenAtom } from "store/BookStore";
import { MemoSpine } from "./Spine";
import {
  BOOK_COVER_DEPTH,
  BOOK_COVER_WIDTH,
  BOOK_PAGE_DEPTH,
  BOOK_PAGE_SEGMENTS,
  BOOK_SPINE_WIDTH,
  INSIDE_CURVE_STRENGTH,
  LERP_FACTOR,
} from "constants/three";

function Book() {
  const [open, _] = useAtom(isOpenAtom);

  const groupRef = useRef<Group>(null);
  const frontCoverRef = useRef<Group>(null);
  const spineRef = useRef<Group>(null);
  const frontPagesRef =
    useRef<SkinnedMesh<BoxGeometry, MeshBasicMaterial[], Object3DEventMap>>(
      null
    );

  useEffect(() => {
    if (!frontCoverRef.current) return;
    // translate origin to edge of spine
    frontCoverRef.current.translateX(BOOK_SPINE_WIDTH);
    frontCoverRef.current.translateZ(
      BOOK_PAGE_DEPTH / 2 + BOOK_COVER_DEPTH / 2
    );
  }, []);

  // here, we want to control the animations for both the cover and page
  useFrame(() => {
    if (
      !frontCoverRef.current ||
      !frontPagesRef.current ||
      !spineRef.current ||
      !groupRef.current
    )
      return;

    const pageBones = frontPagesRef.current.skeleton.bones;
    const targetRotation = open ? -Math.PI / 2 : 0;
    const verticalRotation = open ? -Math.PI / 4 : 0;

    // rotate
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      LERP_FACTOR
    );
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      verticalRotation,
      LERP_FACTOR
    );
    frontCoverRef.current.rotation.y = MathUtils.lerp(
      frontCoverRef.current.rotation.y,
      targetRotation,
      LERP_FACTOR
    );

    // rotate bones
    for (let i = 0; i < pageBones.length; i++) {
      const target = pageBones[i];

      const insideCurveIntensity = i < 10 ? Math.sin(i * 0.3 + 0.25) : 0;
      const rotationAngle =
        INSIDE_CURVE_STRENGTH * insideCurveIntensity * targetRotation;

      target.rotation.y = MathUtils.lerp(
        target.rotation.y,
        rotationAngle,
        LERP_FACTOR
      );

      if (i > 10) {
        target.position.z = MathUtils.lerp(
          target.position.z,
          open ? 0.09 * (i / BOOK_PAGE_SEGMENTS) : 0,
          LERP_FACTOR
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <MemoCover isFront={true} ref={frontCoverRef} />
      <MemoPage ref={frontPagesRef} />
      <MemoSpine ref={spineRef} />
      {/* <MemoCover /> */}
    </group>
  );
}

export const MemoBook = React.memo(Book);

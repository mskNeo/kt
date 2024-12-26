import React, { useEffect, useMemo, useRef } from "react";
import "@react-three/fiber";
import { MemoCover } from "./Cover";
import { MemoPageSet } from "./Page";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  Group,
  MathUtils,
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
  const backCoverRef = useRef<Group>(null);
  const spineRef = useRef<Group>(null);
  const frontPagesRef =
    useRef<SkinnedMesh<BoxGeometry, MeshBasicMaterial[], Object3DEventMap>>(
      null
    );
  const backPagesRef =
    useRef<SkinnedMesh<BoxGeometry, MeshBasicMaterial[], Object3DEventMap>>(
      null
    );

  useEffect(() => {
    if (
      !frontCoverRef.current ||
      !backCoverRef.current ||
      !groupRef.current ||
      !frontPagesRef.current ||
      !backPagesRef.current
    )
      return;
    // position everything properly
    frontCoverRef.current.translateX(BOOK_SPINE_WIDTH);
    frontCoverRef.current.translateZ(BOOK_PAGE_DEPTH + BOOK_COVER_DEPTH / 2);
    backCoverRef.current.translateX(BOOK_SPINE_WIDTH);
    backCoverRef.current.translateZ(-BOOK_PAGE_DEPTH - BOOK_COVER_DEPTH / 2);
    frontPagesRef.current.translateZ(BOOK_PAGE_DEPTH / 2);
    backPagesRef.current.translateZ(-BOOK_PAGE_DEPTH / 2);
    groupRef.current.translateX(-BOOK_COVER_WIDTH / 2);
  }, []);

  // here, we want to control the animations for both the cover and page
  useFrame(() => {
    if (
      !frontCoverRef.current ||
      !backCoverRef.current ||
      !frontPagesRef.current ||
      !backPagesRef.current ||
      !spineRef.current ||
      !groupRef.current
    )
      return;

    const frontPageBones = frontPagesRef.current.skeleton.bones;
    const backPageBones = backPagesRef.current.skeleton.bones;
    const targetRotation = open ? -Math.PI / 2 : 0;
    const verticalRotation = open ? -Math.PI / 4 : 0;
    const groupTranslation = open ? 0 : -BOOK_COVER_WIDTH / 2;

    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      groupTranslation,
      LERP_FACTOR
    );

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
    backCoverRef.current.rotation.y = MathUtils.lerp(
      backCoverRef.current.rotation.y,
      -targetRotation,
      LERP_FACTOR
    );

    // rotate bones
    for (let i = 0; i < frontPageBones.length; i++) {
      const frontTarget = frontPageBones[i];
      const backTarget = backPageBones[i];

      const insideCurveIntensity = i < 10 ? Math.sin(i * 0.3 + 0.25) : 0;
      const rotationAngle =
        INSIDE_CURVE_STRENGTH * insideCurveIntensity * targetRotation;
      const backRotationAngle = -1 * rotationAngle;

      frontTarget.rotation.y = MathUtils.lerp(
        frontTarget.rotation.y,
        rotationAngle,
        LERP_FACTOR
      );

      backTarget.rotation.y = MathUtils.lerp(
        backTarget.rotation.y,
        backRotationAngle,
        LERP_FACTOR
      );

      if (i > 10) {
        frontTarget.position.z = MathUtils.lerp(
          frontTarget.position.z,
          open ? 0.09 * (i / BOOK_PAGE_SEGMENTS) : 0,
          LERP_FACTOR
        );

        backTarget.position.z = MathUtils.lerp(
          backTarget.position.z,
          open ? -0.09 * (i / BOOK_PAGE_SEGMENTS) : 0,
          LERP_FACTOR
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <MemoCover ref={frontCoverRef} />
      <MemoPageSet ref={frontPagesRef} />
      <MemoPageSet ref={backPagesRef} />
      <MemoSpine ref={spineRef} />
      <MemoCover ref={backCoverRef} />
    </group>
  );
}

export const MemoBook = React.memo(Book);

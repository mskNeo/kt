import React, { useEffect, useRef } from "react";
import "@react-three/fiber";
import { Cover } from "./Cover";
import { PageSet } from "./Page";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  Group,
  MathUtils,
  MeshBasicMaterial,
  Object3DEventMap,
  SkinnedMesh,
  Vector3,
} from "three";
import { useAtom } from "jotai";
import { isOpenAtom } from "store/BookStore";
import { Spine } from "./Spine";
import {
  BOOK_COVER_DEPTH,
  BOOK_COVER_WIDTH,
  BOOK_PAGE_DEPTH,
  BOOK_PAGE_SEGMENTS,
  INSIDE_CURVE_STRENGTH,
  LERP_FACTOR,
} from "constants/three";

export default function Book() {
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
    frontCoverRef.current?.translateZ(BOOK_PAGE_DEPTH + BOOK_COVER_DEPTH / 2);
    backCoverRef.current?.translateZ(-BOOK_PAGE_DEPTH - BOOK_COVER_DEPTH / 2);
    frontPagesRef.current?.translateZ(BOOK_PAGE_DEPTH / 2);
    backPagesRef.current?.translateZ(-BOOK_PAGE_DEPTH / 2);
    groupRef.current?.translateX(-BOOK_COVER_WIDTH / 2);
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

    const targetRotation = open ? -Math.PI / 2 : 0;
    const verticalRotation = open ? -Math.PI / 4 : 0;
    const groupTranslation = open ? 0 : -BOOK_COVER_WIDTH / 2;

    // bounce the group vertically infinitely?

    groupRef.current.position.setX(
      MathUtils.lerp(groupRef.current.position.x, groupTranslation, LERP_FACTOR)
    );

    // rotate group
    const newRotationVector = new Vector3(
      MathUtils.lerp(
        groupRef.current.rotation.x,
        verticalRotation,
        LERP_FACTOR
      ),
      MathUtils.lerp(groupRef.current.rotation.y, targetRotation, LERP_FACTOR),
      0
    );
    groupRef.current.rotation.setFromVector3(newRotationVector);

    // rotate covers
    const frontCoverRotationVector = new Vector3(
      0,
      MathUtils.lerp(
        frontCoverRef.current.rotation.y,
        targetRotation,
        LERP_FACTOR
      ),
      0
    );
    const backCoverRotationVector = new Vector3(
      0,
      MathUtils.lerp(
        backCoverRef.current.rotation.y,
        -targetRotation,
        LERP_FACTOR
      ),
      0
    );
    frontCoverRef.current.rotation.setFromVector3(frontCoverRotationVector);
    backCoverRef.current.rotation.setFromVector3(backCoverRotationVector);

    // Animate page bones
    const animatePageBones = (
      bones: SkinnedMesh<
        BoxGeometry,
        MeshBasicMaterial[],
        Object3DEventMap
      >["skeleton"]["bones"],
      direction: number
    ) => {
      for (let i = 0; i < bones.length; i++) {
        const target = bones[i];
        const insideCurveIntensity = i < 12 ? Math.sin(i / 5 + 0.1) : 0.1;
        const rotationAngle =
          INSIDE_CURVE_STRENGTH * insideCurveIntensity * targetRotation;

        target.rotation.y = MathUtils.lerp(
          target.rotation.y,
          direction * rotationAngle,
          LERP_FACTOR
        );

        if (i >= 46) {
          target.position.setX(
            MathUtils.lerp(
              target.position.x,
              open ? 0.12 * (i / BOOK_PAGE_SEGMENTS) : 0,
              LERP_FACTOR
            )
          );
          target.rotation.y = MathUtils.lerp(
            target.rotation.y,
            open ? (direction * (0.2 * i)) / BOOK_PAGE_SEGMENTS : 0,
            LERP_FACTOR
          );
        }
      }
    };

    animatePageBones(frontPagesRef.current.skeleton.bones, 1);
    animatePageBones(backPagesRef.current.skeleton.bones, -1);
  });

  return (
    <group ref={groupRef}>
      <Cover ref={frontCoverRef} />
      <PageSet ref={frontPagesRef} />
      <PageSet ref={backPagesRef} />
      <Spine ref={spineRef} />
      <Cover ref={backCoverRef} />
    </group>
  );
}

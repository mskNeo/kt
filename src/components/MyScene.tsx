import Book from "./Book/Book";
import { Environment, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { isOpenAtom } from "store/BookStore";
import { useAtom } from "jotai";
import { useRef } from "react";

export default function MyScene() {
  const [open] = useAtom(isOpenAtom);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // NOTE: try to smooth out the reset
  if (open) controlsRef.current?.reset();

  return (
    <>
      <Book />
      {/* {!open && <OrbitControls enableDamping={true} ref={controlsRef} />} */}
      <Environment preset="warehouse" />
    </>
  );
}

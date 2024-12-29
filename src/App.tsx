import { Profiler, useRef } from "react";
import MouseTrail from "components/MouseTrail/MouseTrail";
import { useAtom } from "jotai";
import { isOpenAtom } from "store/BookStore";
import Modal from "components/Content/Modal";
import "styles/App.css";
import { Canvas } from "@react-three/fiber";
import MyScene from "components/MyScene";

export default function App() {
  const mainContainerRef = useRef(null);
  const [open, setOpen] = useAtom(isOpenAtom);

  const onRenderCallback: React.ProfilerOnRenderCallback = (
    id: string, // the "id" prop of the Profiler tree that has just committed
    phase: "mount" | "update" | "nested-update", // either "mount" (initial render) or "update" (re-render)
    actualDuration: number, // time spent rendering the committed update
    baseDuration: number, // estimated time to render the entire subtree without memoization
    startTime: number, // when React began rendering this update
    commitTime: number // when React committed this update
  ) => {
    console.info("Profiler Log:");
    console.info(`Component ID: ${id}`);
    console.info(`Render phase: ${phase}`);
    console.info(`Actual render time: ${actualDuration}ms`);
    console.info(`Base render time: ${baseDuration}ms`);
    console.info(`Render start time: ${startTime}ms`);
    console.info(`Commit time: ${commitTime}ms`);
  };

  return (
    <main ref={mainContainerRef}>
      <MouseTrail parentRef={mainContainerRef} />

      {/* <Profiler id="scene" onRender={onRenderCallback}> */}
      <Canvas>
        <MyScene />
      </Canvas>
      <button onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</button>
      <Modal />
      {/* </Profiler> */}
    </main>
  );
}

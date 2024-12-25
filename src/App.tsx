import { useRef } from "react";
import MouseTrail from "components/MouseTrail/MouseTrail";

import "styles/App.css";
import { MemoCanvas } from "components/Canvas";
import { useAtom } from "jotai";
import { isOpenAtom } from "store/BookStore";

export default function App() {
  const mainContainerRef = useRef(null);
  const [open, setOpen] = useAtom(isOpenAtom);

  return (
    <main ref={mainContainerRef}>
      <MouseTrail parentRef={mainContainerRef} />
      <MemoCanvas />
      <button onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</button>
    </main>
  );
}

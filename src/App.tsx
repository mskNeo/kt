import { useRef } from "react";
import { MemoCanvas } from "components/3d/Scene/Canvas";
import { MemoBook } from "components/2d/Book";
import MouseTrail from "components/MouseTrail/MouseTrail";

import "styles/App.css";

const use3d = false; // feature flag to switch between 2d and 3d

function App() {
  const mainContainerRef = useRef(null);

  return (
    <main ref={mainContainerRef}>
      <MouseTrail parentRef={mainContainerRef} />
      {use3d ? <MemoCanvas /> : <MemoBook />}
    </main>
  );
}

export default App;

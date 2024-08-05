import React, { useCallback, useState } from "react";
import { MemoCanvas } from "components/Scene/Canvas";
import MouseTrail from "components/MouseTrail/MouseTrail";

import "styles/App.css";

/*
 * code to check orientation and ask to rotate
 * do I even need this? test out three js scene on mobile first
document.addEventListener("orientationchange", function(event){
    switch(window.orientation) 
    {  
        case -90: case 90:
            // Device is in landscape mode 
            break; 
        default:
            // Device is in portrait mode
    }
});
*/

function App() {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMousePosition([event.clientX, event.clientY]);
  }, []);

  return (
    <main onMouseMove={onMouseMove}>
      <MouseTrail mousePosition={mousePosition} />
      <MemoCanvas />
    </main>
  );
}

export default App;

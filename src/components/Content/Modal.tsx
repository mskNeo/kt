import { useAtom } from "jotai";
import { isOpenAtom } from "store/BookStore";
import "styles/Modal.css";

// we only want to start animations after the component renders
let firstRender = true;

// make modal look like two pages in an old book with images and stuff
// need to create a template or maybe I can create snippets/partial jsx files for pages
// maybe do pages with all text and pages with image and caption below like a picture book
export default function Modal() {
  const [open, _] = useAtom(isOpenAtom);

  const handleOnAnimationStart = () => {
    firstRender = false;
  };

  return (
    <div
      id="modal"
      className={open ? "fade-in" : !firstRender ? "fade-out" : ""}
      onAnimationStart={handleOnAnimationStart}
    >
      <div className="leftPage"></div>
      <div className="rightPage"></div>
    </div>
  );
}

import { useAtom } from "jotai";
import { isOpenAtom } from "store/BookStore";
import { useMediaQuery } from "react-responsive";
import styles from "styles/Modal.module.css";
import animationStyles from "styles/Animations.module.css";
import One from "./Pages/One";

// we only want to start animations after the component renders
let firstRender = true;

// make modal look like two pages in an old book with images and stuff
// need to create a template or maybe I can create snippets/partial jsx files for pages
// maybe do pages with all text and pages with image and caption below like a picture book
// one page for mobile/tablet, two pages for computers
export default function Modal() {
  const [open, _] = useAtom(isOpenAtom);
  const isLandscape = useMediaQuery({ query: "(orientation: landscape) " });
  // need to process pages one at a time or two depending on isLandscape

  const handleOnAnimationStart = () => {
    firstRender = false;
  };

  return (
    <div
      id={styles.modal}
      className={
        open
          ? animationStyles.fadeIn
          : !firstRender
          ? animationStyles.fadeOut
          : ""
      }
      onAnimationStart={handleOnAnimationStart}
    >
      <div className={styles.page}>
        <One />
      </div>
      {isLandscape && <div className={styles.page}></div>}
    </div>
  );
}

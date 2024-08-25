import { useCallback, useEffect, useRef } from "react";
import { flipCover } from "./Animations";

export default function BookCover() {
  return (
    <>
      <div
        className="book-cover"
        id="outer"
        onClick={(e) => {
          console.log("hi");
          const a = flipCover({ isOuter: true });
          console.log("animations", a);
          // e.currentTarget.animate(a);
        }}
      >
        <h1>hi</h1>
      </div>
      <div className="book-cover" id="inner" />
    </>
  );
}

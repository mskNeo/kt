import React from "react";
import BookCover from "./BookCover";

import "styles/Book/index.css";

function Book() {
  return (
    <div id="book">
      <BookCover />
    </div>
  );
}

export const MemoBook = React.memo(Book);

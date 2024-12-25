import {
  BOOK_COVER_DEPTH,
  BOOK_COVER_HEIGHT,
  BOOK_COVER_WIDTH,
  BOOK_PAGE_DEPTH,
  BOOK_SPINE_WIDTH,
} from "constants/three";
import { BoxGeometry } from "three";

const FrontCoverGeometry = new BoxGeometry(
  BOOK_COVER_WIDTH,
  BOOK_COVER_HEIGHT,
  BOOK_COVER_DEPTH
).translate(BOOK_COVER_WIDTH / 2 - BOOK_SPINE_WIDTH / 2, 0, 0);

const BackCoverGeometry = new BoxGeometry(
  BOOK_COVER_WIDTH,
  BOOK_COVER_HEIGHT,
  BOOK_COVER_DEPTH
).translate(
  BOOK_COVER_WIDTH / 2,
  0,
  -BOOK_PAGE_DEPTH / 2 - BOOK_COVER_DEPTH / 2
);

export { FrontCoverGeometry, BackCoverGeometry };

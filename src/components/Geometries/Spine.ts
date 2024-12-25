import {
  BOOK_SPINE_DEPTH,
  BOOK_SPINE_HEIGHT,
  BOOK_SPINE_WIDTH,
} from "constants/three";
import { BoxGeometry } from "three";

const SpineGeometry = new BoxGeometry(
  BOOK_SPINE_WIDTH,
  BOOK_SPINE_HEIGHT,
  BOOK_SPINE_DEPTH
);

export { SpineGeometry };

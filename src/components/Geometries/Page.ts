import { makePageSideTexture } from "components/Textures/PageTexture";
import {
  BOOK_PAGE_DEPTH,
  BOOK_PAGE_HEIGHT,
  BOOK_PAGE_SEGMENT_WIDTH,
  BOOK_PAGE_SEGMENTS,
  BOOK_PAGE_WIDTH,
} from "constants/three";
import {
  BoxGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial,
  MeshStandardMaterial,
  TextureLoader,
  Uint16BufferAttribute,
  Vector3,
} from "three";

const PageGeometry = new BoxGeometry(
  BOOK_PAGE_WIDTH,
  BOOK_PAGE_HEIGHT,
  BOOK_PAGE_DEPTH,
  BOOK_PAGE_SEGMENTS
).translate(BOOK_PAGE_WIDTH / 2, 0, 0);

const position = PageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndices = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  // ALL VERTICES
  vertex.fromBufferAttribute(position, i); // get the vertex
  const x = vertex.x; // get the x position

  const skinIndex = Math.max(0, Math.floor(x / BOOK_PAGE_SEGMENT_WIDTH)); // pick the bone based on vertex position
  const skinWeight = (x % BOOK_PAGE_SEGMENT_WIDTH) / BOOK_PAGE_SEGMENT_WIDTH; // calculate the weight that bone is affecting vertex

  skinIndices.push(skinIndex, skinIndex + 1, 0, 0); // set the skin index
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0); // set the skin weight
}

PageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndices, 4)
);

PageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

const pageTexture = new TextureLoader().load("textures/paper.webp", () =>
  console.info("loaded texture")
);

const pageMaterials = [
  // right
  new MeshBasicMaterial({
    map: makePageSideTexture(Math.PI / 2),
  }),
  // left (spine)
  new MeshBasicMaterial({
    color: "#f2dcb1",
  }),
  // top
  new MeshBasicMaterial({
    map: makePageSideTexture(),
  }),
  // bottom
  new MeshBasicMaterial({
    map: makePageSideTexture(),
  }),
  // front
  new MeshBasicMaterial({
    map: pageTexture,
  }),
  // back
  new MeshBasicMaterial({
    map: pageTexture,
  }),
];

export { PageGeometry, pageMaterials };

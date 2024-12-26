/** File of constant values for three.js */

/** Scene Constants */
// Field of view
export const FOV = 75;

// Scene Dimensions
export const SCENE_HEIGHT = window.innerWidth;
export const SCENE_WIDTH = window.innerHeight;
export const SCENE_ASPECT_RATIO = SCENE_WIDTH / SCENE_HEIGHT;

// Near plane
export const NEAR = 0.1;

// Far plane
export const FAR = 1000;

const SCALE_FACTOR = 2;

/** Book Constants */
// Book Cover Dimensions
export const BOOK_COVER_HEIGHT = 1.5 * SCALE_FACTOR;
export const BOOK_COVER_WIDTH = 1.2 * SCALE_FACTOR;
export const BOOK_COVER_DEPTH = 0.05 * SCALE_FACTOR;

// Book Page Dimensions
export const BOOK_PAGE_HEIGHT = 1.45 * SCALE_FACTOR;
export const BOOK_PAGE_WIDTH = 1.175 * SCALE_FACTOR;
export const BOOK_PAGE_DEPTH = 0.15 * SCALE_FACTOR;
export const BOOK_PAGE_SEGMENTS = 50;
export const BOOK_PAGE_SEGMENT_WIDTH = BOOK_PAGE_WIDTH / BOOK_PAGE_SEGMENTS;

// Book Spine Dimensions
export const BOOK_SPINE_HEIGHT = BOOK_COVER_HEIGHT;
export const BOOK_SPINE_WIDTH = BOOK_COVER_DEPTH;
export const BOOK_SPINE_DEPTH = 2 * BOOK_PAGE_DEPTH;

// constants for book turning animations
export const LERP_FACTOR = 0.05;
export const INSIDE_CURVE_STRENGTH = 0.1;

// colors for book
export const COVER_COLOR = "#027d6f";

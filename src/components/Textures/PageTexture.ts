import { CanvasTexture, TextureLoader } from "three";

function makePageSideTexture(rotationAngle?: number) {
  // Create a canvas and draw lines
  const canvas = document.createElement("canvas");
  const size = 256; // Canvas size
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx == null) return;

  // Set background color (optional)
  ctx.fillStyle = "#f2dcb1";
  ctx.fillRect(0, 0, size, size);

  if (rotationAngle != undefined) {
    // Translate to the center of the canvas for rotation
    ctx.translate(size / 2, size / 2);
    ctx.rotate(rotationAngle); // Apply rotation
    ctx.translate(-size / 2, -size / 2);
  }

  // Draw lines
  ctx.strokeStyle = "#000000"; // Line color
  ctx.lineWidth = 5; // Line width
  const spacing = 10; // Spacing between lines

  for (let y = 0; y < size; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // Create a texture from the canvas
  const texture = new CanvasTexture(canvas);

  return texture;
}

const pageTexture = new TextureLoader().load("textures/paper.webp");

export { pageTexture, makePageSideTexture };

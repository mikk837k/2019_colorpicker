"use strict";

window.addEventListener("DOMContentLoaded", init);

let imageData;
const ctx = document.querySelector("#imageCanvas").getContext("2d");
const MAX_MOVEMENT = 10;
let x;
let y;

function init() {
  let img = new Image();

  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0);
    readImageData();
  });
  img.src = "cat.jpg";

  const imageCanvas = document.querySelector("#imageCanvas");
  imageCanvas.addEventListener("mousemove", mouseMoved);
}

function readImageData() {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  imageData = ctx.getImageData(x, y, w, h);
}

function mouseMoved(evt) {
  console.log(evt);
  x = evt.offsetX;
  y = evt.offsetY;

  console.log(`${x} ${y}`);

  let mouseXratio = (1 / ctx.canvas.width) * x * 2 - 1;
  let mouseYratio = (1 / ctx.canvas.height) * y * 2 - 1;

  document.querySelector("#ratioX").textContent = `Xratio: ${mouseXratio}`;
  document.querySelector("#ratioY").textContent = `Yratio: ${mouseYratio}`;

  const displacementX = mouseXratio * MAX_MOVEMENT;
  const displacementY = mouseYratio * MAX_MOVEMENT;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.putImageData(imageData, 0, 0);
  drawRectangle(displacementX, displacementY);
}

function drawRectangle(displacementX, displacementY) {
  ctx.strokeRect(
    displacementX + MAX_MOVEMENT,
    displacementY + MAX_MOVEMENT,
    ctx.canvas.width - MAX_MOVEMENT * 2,
    ctx.canvas.height - MAX_MOVEMENT * 2
  );
  ctx.strokeStyle = "red";
}

"use strict";

const ctx = document.querySelector("#imageCanvas").getContext("2d");
const ctxZoom = document.querySelector("#zoomCanvas").getContext("2d");
let imageCanvas = document.querySelector("#imageCanvas");
let imgData, zoomData, pixelIndex, x, y;

window.addEventListener("DOMContentLoaded", init);

// console.log(imgData);

// pixelIndex = 4 * (x + y * width)

function init() {
  let img = new Image();

  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0);
    readImageData();
    readZoomData();
  });
  img.src = "cat.jpg";

  imageCanvas.addEventListener("mousemove", mouseMoved);
}

function mouseMoved(evt) {
  console.log(evt);
  x = evt.offsetX;
  y = evt.offsetY;

  ctx.putImageData(imgData, 0, 0);
  ctxZoom.putImageData(zoomData, 0, 0);

  let rgba = getColorInfo(x, y);
  showColorInfo(rgba);
  drawRectangle(x, y);
  copyPixelsToZoomData(x, y);
  drawZoomDataToZoomCanvas();
}

function drawRectangle(x, y) {
  let rectangle = {
    color: "green",
    draw: function() {
      ctx.beginPath();
      ctx.rect(x - 5, y - 5, 10, 10);
      ctx.closePath();
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  };
  rectangle.draw();
}

function readImageData() {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  imgData = ctx.getImageData(x, y, w, h);
}

function readZoomData() {
  const w = 10;
  const h = 10;

  zoomData = ctxZoom.getImageData(x, y, w, h);

  console.log(zoomData);
}

function drawZoomDataToZoomCanvas() {
  ctxZoom.putImageData(zoomData, 0, 0);
  console.log(ctxZoom);
}

function copyPixelsToZoomData(offsetX, offsetY) {
  console.log("copyPixelsToZoomData");

  let w = ctxZoom.canvas.width;
  const imageWidth = ctx.canvas.width;

  for (let y = 0; y <= 10; y++) {
    for (let x = 0; x <= 10; x++) {
      let imageY = offsetY + y;
      let imageX = offsetX + x;
      let pixelIndex = 4 * (x + y * w);
      let ImageIndex = 4 * (imageX + imageY * imageWidth);

      zoomData.data[pixelIndex] = imgData.data[ImageIndex];
      zoomData.data[pixelIndex + 1] = imgData.data[ImageIndex + 1];
      zoomData.data[pixelIndex + 2] = imgData.data[ImageIndex + 2];
      zoomData.data[pixelIndex + 3] = imgData.data[ImageIndex + 3];
      console.log(pixelIndex);
    }
  }
}

function getColorInfo() {
  const w = imgData.width;
  let pixelIndex = 4 * (x + y * w);
  let r = imgData.data[pixelIndex];
  let g = imgData.data[pixelIndex + 1];
  let b = imgData.data[pixelIndex + 2];

  return { r, g, b };
}

// 🎁 Here you go! 🎁
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}

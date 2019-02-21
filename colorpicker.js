"use strict";

let ctx = document.querySelector("#imageCanvas").getContext("2d");
let ctxZoom = document.querySelector("#zoomCanvas").getContext("2d");
let imageCanvas = document.querySelector("#imageCanvas");
let imgData;
let zoomData;
let pixelIndex;
let x;
let y;

window.addEventListener("DOMContentLoaded", init);

// console.log(imgData);

// pixelIndex = 4 * (x + y * width)

function init() {
  let img = new Image();
  img.src = "cat.jpg";

  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0);
    readImageData();
    readZoomData();

    drawZoomDataToZoomCanvas();
  });

  imageCanvas.addEventListener("mousemove", mouseMoved);
}

function mouseMoved(evt) {
  console.log(evt);
  x = evt.offsetX;
  y = evt.offsetY;

  //   console.log(`Mouse x-axis: ${x} y-axis: ${y}`);

  ctx.putImageData(imgData, 0, 0);
  ctxZoom.putImageData(zoomData, 0, 0);

  let rgb = getColorInfo(x, y);

  showColorInfo(rgb);

  drawRectangle(x, y);
}

function drawRectangle(x, y) {
  let rectangle = {
    color: "green",
    draw: function() {
      ctx.beginPath();
      ctx.rect(x, y, 10, 10);
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

function copyPixelsFromimageDatatoZoomData() {}
function drawZoomDataToZoomCanvas() {
  console.log(ctxZoom);
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

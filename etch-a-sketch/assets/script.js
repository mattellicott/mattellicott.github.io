const DEFAULT_COLOR = "#000000";
const DEFAULT_SIZE = 50;

const buttons = document.getElementById("buttons");
const screenGrid = document.getElementById("screenGrid");
const colorPickerBtn = document.getElementById("colorPickerBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const sizeSldr = document.getElementById("sizeSldr");
const sizeSldrLabel = document.getElementById("sizeSldrLabel");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = "colorPicker";

let mouseDown = false;
window.onmousedown = () => (mouseDown = true);
window.onmouseup = () => (mouseDown = false);

colorPickerBtn.onchange = (e) => {
  setCurrentMode("colorPicker");
  currentColor = e.target.value;
};
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = (e) => {
  e.target.classList.add("active");
  setTimeout((e) => e.target.classList.remove("active"), 250, e);
  resetGrid();
};
sizeSldr.oninput = (e) => {
  currentSize = e.target.value;
  updateSizeSldrLabel();
  resetGrid();
};

function setupGrid() {
  for (let i = 0; i < currentSize * currentSize; i++) {
    const newCell = document.createElement("div");
    newCell.addEventListener("mouseover", colorCell);
    newCell.addEventListener("mousedown", colorCell);
    screenGrid.appendChild(newCell);
  }

  screenGrid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
  screenGrid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
}

function resetGrid() {
  screenGrid.replaceChildren();
  setupGrid();
}

function colorCell(cell) {
  if (cell.type === "mouseover" && !mouseDown) return;
  switch (currentMode) {
    case "colorPicker":
      cell.target.style.backgroundColor = currentColor;
      break;
    case "rainbow":
      cell.target.style.backgroundColor = randomizeColor();
      break;
    case "eraser":
      cell.target.style.backgroundColor = "";
      break;
  }
}

function randomizeColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);

  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
  showActiveMode(currentMode);
}

function showActiveMode(newMode) {
  for (let child of buttons.children) {
    id = child.id;
    classList = child.classList;

    if (id.includes(newMode)) {
      if (!classList.contains("active")) classList.add("active");
    } else if (classList.contains("active")) classList.remove("active");
  }
}

function updateSizeSldrLabel() {
  sizeSldrLabel.innerHTML = `${currentSize} x ${currentSize}`;
}

window.onload = () => {
  showActiveMode(currentMode);
  updateSizeSldrLabel();
  setupGrid();
};

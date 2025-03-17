const sliderHandle = document.querySelector("#sliderHandle");
const sliderLine = document.querySelector(".slider-line");
const beforeImage = document.querySelector(".before-image");
const afterImage = document.querySelector(".after-image");
const sliderContainer = document.querySelector(".slider-container");

let isDragging = false;

// Function to initialize the slider at the center position
const initializeSlider = () => {
  const containerWidth = sliderContainer.offsetWidth;

  // Set slider handle and line at center with a transition for initialization
  sliderHandle.style.transition = "left 0.3s ease";
  sliderLine.style.transition = "left 0.3s ease";

  sliderHandle.style.left = "50%";
  sliderLine.style.left = "50%";

  // Set both images' clip-path to 50% (center)
  beforeImage.style.clipPath = `inset(0 50% 0 0)`;
  afterImage.style.clipPath = `inset(0 0 0 50%)`;
};

// Function to move the slider based on user interaction
const moveSlider = (clientX) => {
  const containerRect = sliderContainer.getBoundingClientRect();
  let offsetX = clientX - containerRect.left;

  // Limit the slider movement within the full container width (0% to 100%)
  if (offsetX < 0) offsetX = 0; // Prevent overflow on the left
  if (offsetX > containerRect.width) offsetX = containerRect.width; // Prevent overflow on the right

  const percentage = Math.round((offsetX / containerRect.width) * 100);

  // Update the slider handle position and image clipping
  sliderHandle.style.left = `${percentage}%`;
  sliderLine.style.left = `${percentage}%`;

  // Adjust the clip-path for both images
  beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
};

// Add event listeners for both the handle and the line (including the SVG)
const startDragging = (event) => {
  isDragging = true;

  // Remove transitions while dragging for instant feedback
  sliderHandle.style.transition = "none";
  sliderLine.style.transition = "none";

  // Prevent default behavior for touch events
  if (event.type === "touchstart") {
    event.preventDefault();
  }
};

const stopDragging = () => {
  isDragging = false;

  // Reapply transitions after dragging ends
  sliderHandle.style.transition = "left 0.3s ease";
  sliderLine.style.transition = "left 0.3s ease";
};

// Mouse event listeners
sliderHandle.addEventListener("mousedown", startDragging);
sliderLine.addEventListener("mousedown", startDragging); // Make SVG and line draggable

window.addEventListener("mousemove", (event) => {
  if (isDragging) {
    moveSlider(event.clientX);
  }
});

window.addEventListener("mouseup", stopDragging);

// Touch event listeners
sliderHandle.addEventListener("touchstart", startDragging);
sliderLine.addEventListener("touchstart", startDragging); // Make SVG and line draggable

window.addEventListener("touchmove", (event) => {
  if (isDragging) {
    moveSlider(event.touches[0].clientX);
  }
});

window.addEventListener("touchend", stopDragging);

// Initialize the slider on page load
window.addEventListener("load", initializeSlider);
const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 3000;

let slides = document.querySelectorAll(".slide");
let index = 1;
let clicks = 1;
let slideId;
let currentDot;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
    setActiveDot();
  }, interval);
};
const turnOffBtns = () => {
  prevBtn.style.pointerEvents = "none";
  nextBtn.style.pointerEvents = "none";
};

const turnOnBtns = () => {
  prevBtn.style.pointerEvents = "auto";
  nextBtn.style.pointerEvents = "auto";
};

const getSlides = () => document.querySelectorAll(".slide");

const flipSlide = () => {
  slide.style.transition = "0.7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  turnOffBtns();
};

const setActiveDot = () => {
  if (index !== slides.length - 1) {
    currentDot = document.getElementById(`dot-${index}`);
    currentDot.classList.add("active");
  } else {
    currentDot = document.getElementById(`dot-1`);
    currentDot.classList.add("active");
  }
};
const disableDot = () => {
  if (index === 2) {
    currentDot = document.getElementById(`dot-1`);
    currentDot.classList.remove("active");
  }
  if (index === slides.length - 1) {
    currentDot = document.getElementById(`dot-${slides.length - 2}`);
    currentDot.classList.remove("active");
  } else {
    currentDot = document.getElementById(`dot-${index - 1}`);
    currentDot.classList.remove("active");
  }
};

slide.addEventListener("transitionend", () => {
  disableDot();
  turnOnBtns();
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  setActiveDot();
  disableDot();
  flipSlide();
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  flipSlide();
};

const checkOutsideClick = ({ target }) => {
  if (target.id.includes("dot")) {
    index = [...document.getElementsByName("dot-selector")].findIndex(
      (e) => e === target
    );
    flipSlide();
  }
};

document.body.addEventListener("click", checkOutsideClick);

startSlide();

nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);

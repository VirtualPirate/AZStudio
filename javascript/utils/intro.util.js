import {
  getSlideAnimationFrames,
  slideAnimationProperties,
} from "../animations/slide.anim.js";

import {
  popAnimationFrames,
  popAnimationProperties,
} from "../animations/pop.anim.js";

import {
  floatAnimationFrames,
  floatAnimationProperties,
} from "../animations/float.anim.js";

function reverseAnimationProperties(animationProperties) {
  return Object.assign({}, animationProperties, { direction: "reverse" });
}

// const introBoxAnimationFrames = popAnimationFrames;
// const introBoxAnimationProperties = popAnimationProperties;

const introBoxAnimationFrames = getSlideAnimationFrames("left");
const introBoxAnimationProperties = slideAnimationProperties;

const body = document.querySelector("body");
const root = document.querySelector(":root");
const boxStroke = document.querySelector(".box-stroke");
const glowBox = document.querySelector(".glow-box");
const subjectUp = document.querySelector(".subject-up");
const subjectDown = document.querySelector(".subject-down");
const box = document.querySelectorAll(".box");
const subject = document.querySelectorAll(".subject");
const introBox = document.querySelectorAll(".intro-box img");
const toggleThemeBtn = document.querySelector(".toggle-theme-btn");

console.log(subjectUp.getAnimations());

const strangeTheme = {
  box: "strange-box.png",
  glow: "green-glow.png",
  subjectUp: "strange-up.png",
  subjectDown: "strange-down.png",
  color: "#60ff00",
  backgroundImage: "background-green.png",
  // backgroundImage: "background.png",
  toggleTranslate: "translateX(90px)",
};

const redTheme = {
  box: "red-box.png",
  glow: "red-glow.png",
  subjectUp: "red-subject-up.png",
  subjectDown: "red-subject-down.png",
  color: "#f0050d",
  backgroundImage: "background-red.jpg",
  // backgroundImage: "red-background.png",
  toggleTranslate: "translateX(0)",
};

const themeAssets = {
  strange: strangeTheme,
  red: redTheme,
};

function introBoxDir(src) {
  return `./graphics/${src}`;
}

let theme = "strange";
function switchTheme() {
  if (theme === "strange") theme = "red";
  else theme = "strange";

  return theme;
}

toggleThemeBtn.addEventListener("click", () => {
  let assets = themeAssets[switchTheme()];
  let animationElements = [];

  introBox.forEach((element) => {
    const animationElement = element.animate(
      introBoxAnimationFrames,
      reverseAnimationProperties(introBoxAnimationProperties)
    );
    animationElements.push(animationElement);
  });

  root.style.setProperty(
    "--background",
    `url(../../graphics/bg-gradient.png),
  url(../../graphics/${assets.backgroundImage})`
  );

  root.style.setProperty("--primary-color", assets.color);

  console.log(animationElements);
  animationElements.forEach((element) => {
    element.onfinish = (e) => {
      boxStroke.src = introBoxDir(assets.box);
      glowBox.src = introBoxDir(assets.glow);
      subjectUp.src = introBoxDir(assets.subjectUp);
      subjectDown.src = introBoxDir(assets.subjectDown);
      introBox.forEach((element) => {
        element.animate(
          getSlideAnimationFrames("right"),
          introBoxAnimationProperties
        );
      });
    };
  });

  toggleThemeBtn.querySelector(".toggle-circle").style.transform =
    assets.toggleTranslate;
});

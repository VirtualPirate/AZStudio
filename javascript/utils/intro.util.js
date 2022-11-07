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

const introBoxAnimationFrames = popAnimationFrames;
const introBoxAnimationProperties = popAnimationProperties;

const body = document.querySelector("body");
const root = document.querySelector(":root");
const boxStroke = document.querySelector(".box-stroke");
const glowBox = document.querySelector(".glow-box");
const subjectUp = document.querySelector(".subject-up");
const subjectDown = document.querySelector(".subject-down");
const box = document.querySelectorAll(".box");
const subject = document.querySelectorAll(".subject");
const introBox = document.querySelectorAll(".intro-box *");
const toggleThemeBtn = document.querySelector(".toggle-theme-btn");

console.log(subjectUp.getAnimations());

const strangeTheme = {
  subjectUp: "strange-up.png",
  subjectDown: "strange-down.png",
  color: "#60ff00",
  toggleTranslate: "translateX(0%)",
  filter: "hue-rotate(130deg)",
};

const redTheme = {
  subjectUp: "red-subject-up.png",
  subjectDown: "red-subject-down.png",
  color: "#f0050d",
  toggleTranslate: "translateX(165%)",
  filter: "none",
};

const themeAssets = {
  strange: strangeTheme,
  red: redTheme,
};

function introBoxDir(src) {
  return `./graphics/${src}`;
}

let theme = "red";
function switchTheme() {
  if (theme === "strange") theme = "red";
  else theme = "strange";

  return theme;
}

toggleThemeBtn.addEventListener("click", () => {
  let assets = themeAssets[switchTheme()];

  introBox.forEach((element) => {
    const animationElement = element.animate(
      introBoxAnimationFrames,
      reverseAnimationProperties(introBoxAnimationProperties)
    );

    animationElement.onfinish = (e) => {
      subjectUp.src = introBoxDir(assets.subjectUp);
      subjectDown.src = introBoxDir(assets.subjectDown);
      const animationElement = element.animate(
        popAnimationFrames,
        introBoxAnimationProperties
      );

      animationElement.onfinish = () => {
        if (element.classList.contains("subject"))
          element.animate(floatAnimationFrames, floatAnimationProperties);
      };
    };
  });

  root.style.setProperty("--background-filter", assets.filter);
  root.style.setProperty("--primary-color", assets.color);

  toggleThemeBtn.querySelector(".toggle-circle").style.transform =
    assets.toggleTranslate;
});

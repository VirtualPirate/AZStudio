export const slideAnimationProperties = {
  duration: 500,
  fill: "forwards",
};

export function getSlideAnimationFrames(type = "left", from = "100px") {
  let translate = undefined;
  switch (type) {
    case "left":
      translate = `translateX(${from})`;
      break;
    case "right":
      translate = `translateX(-${from})`;
      break;
    case "top":
      translate = `translateY(${from})`;
      break;
    case "bottom":
      translate = `translateY(-${from})`;
      break;
  }

  const slideAnimation = [
    { transform: translate, opacity: 0 },
    { transform: "translate(0)", opacity: 1 },
  ];

  return slideAnimation;
}

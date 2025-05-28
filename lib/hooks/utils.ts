"use client";

export function setScreenSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

const prevOverScrollConfig = {
  html: "",
  body: "",
};

export function handleOverscroll(isEnabled: boolean = true) {
  if (isEnabled) {
    document.documentElement.style.overscrollBehavior =
      prevOverScrollConfig.html;
    document.body.style.overscrollBehavior = prevOverScrollConfig.body;
  } else {
    prevOverScrollConfig.html =
      document.documentElement.style.overscrollBehavior;
    prevOverScrollConfig.body = document.body.style.overscrollBehavior;

    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overscrollBehavior = "none";
  }
}

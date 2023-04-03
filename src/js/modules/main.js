let headingText = document.querySelector("h1");
const mainScreenText = document.querySelector(".main-screen__text");
const header = document.querySelector(".header");
const callBtn = document.querySelector(".main-screen__btn");
const footer = document.querySelector("footer");
const headerCallBtn = document.querySelector(".header__call-btn");

document.addEventListener("DOMContentLoaded", () => {
  headingText.style.visibility = "visible";

  // ========== split title on spans to animate
  const lettersInArray = headingText.innerHTML.split("");
  let spans = [];
  lettersInArray.forEach((letter) => {
    spans.push(`<span>${letter}</span>`);
  });
  headingText.innerHTML = spans.join("");
  // ===========================================

  // ========== animate spans
  headingText.querySelectorAll("span").forEach((eachSpan, i) => {
    setTimeout(function () {
      eachSpan.style.opacity = 100;
    }, 200 * i);
  });
  // ==========

  // ========== animate main content
  mainScreenText.classList.add("active");
  header.classList.add("appeared");
  callBtn.classList.add("appeared");
  // ==========
});

headerCallBtn.addEventListener("click", (e) => {
  e.preventDefault();
  footer.scrollIntoView({ behavior: "smooth" });
});

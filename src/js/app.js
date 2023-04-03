import * as functions from "./modules/functions.js";
import * as burger from "./modules/burger.js";
import * as main from "./modules/main.js";
import { Loader } from "@googlemaps/js-api-loader";
import * as form from "./modules/form.js";

functions.isWebp();

let map;
const additionalOptions = {};
const loader = new Loader({
  apiKey: "AIzaSyCRGPPaPObqT7ZwGcIvAG_3fTCmYNCsXVE",
  version: "weekly",
  ...additionalOptions,
});
const loadMask = document.querySelector(".mask");

loader.load().then(() => {
  toggleButtons(window.innerWidth);

  loadMask.classList.add("hide");
  setTimeout(() => {
    loadMask.remove();
  }, 600);
  const uluru = { lat: 55.76804071602304, lng: 37.57025917424042 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: uluru,
    zoom: 17,
    styles: [
      {
        featureType: "all",
        stylers: [
          {
            saturation: 0,
          },
          {
            hue: "#e7ecf0",
          },
        ],
      },
      {
        featureType: "road",
        stylers: [
          {
            saturation: -70,
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            saturation: -60,
          },
        ],
      },
    ],
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
});

// Animations of Images
let images = Array.from(document.querySelectorAll("img"));
const comfortSection = document.querySelector(".comfort");
const imagesInSlider = Array.from(comfortSection.querySelectorAll("img"));
const imagesForScroll = images.reduce((acc, image) => {
  if (!imagesInSlider.includes(image)) {
    acc.push(image);
  }
  return acc;
}, []);
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("appeared", entry.isIntersecting);
      if (entry.isIntersecting) scrollObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0,
  }
);

imagesForScroll.forEach((image) => {
  scrollObserver.observe(image);
});

// Animations of text
const sectionTitles = document.querySelectorAll("h2");
const aboutText = document.querySelectorAll(".about__text");
const environmentAddress = document.querySelector(".environment__address");
const environmentText = document
  .querySelector(".environment__text")
  .querySelectorAll("p");
const advantagesSection = document.querySelector(".advantages");
const advantagesItems = advantagesSection.querySelectorAll("li");
let transitionDelay = 0;
const offerInfo = document.querySelectorAll(".offer__info");
const comfortLabel = comfortSection.querySelector("p");
const propertiesList = document.querySelector(".properties__list");
const footer = document.querySelector("footer");
const footerTitles = footer.querySelectorAll("h3");
const footerContact = footer
  .querySelector(".footer__contact")
  .querySelectorAll("div");

sectionTitles.forEach((title) => {
  scrollObserver.observe(title);
});
aboutText.forEach((text) => {
  scrollObserver.observe(text);
});
scrollObserver.observe(environmentAddress);
environmentText.forEach((text) => {
  scrollObserver.observe(text);
});
advantagesItems.forEach((item) => {
  item.style.transitionDelay = `${transitionDelay}s`;
  transitionDelay += 0.05;
  scrollObserver.observe(item);
});
transitionDelay = 0;
offerInfo.forEach((infoBlock) => {
  Array.from(infoBlock.children).forEach((child) => {
    scrollObserver.observe(child);
  });
});
scrollObserver.observe(comfortLabel);
scrollObserver.observe(propertiesList);
Array.from(propertiesList.children).forEach((child) => {
  child.style.transitionDelay = `${transitionDelay}s`;
  transitionDelay += 0.1;
});
footerTitles.forEach((title) => {
  scrollObserver.observe(title);
});
footerContact.forEach((block) => {
  scrollObserver.observe(block);
});

//swiper
const swiper = new Swiper(".comfort__swiper", {
  modules: [Navigation, Pagination],
  allowTouchMove: true,
  effect: "flip",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  speed: 600,
  spaceBetween: 100,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  clickable: true,
});

document
  .querySelector("#next")
  .addEventListener("click", swiper.navigation.nextEl);

const toggleButtons = (vw) => {
  const bodyStyle = getComputedStyle(document.querySelector("body"));
  const fz = Number(bodyStyle.fontSize.slice(0, -2));
  const insideButtons = document
    .querySelector(".slider")
    .querySelectorAll(".slider__button");

  insideButtons.forEach((button) => {
    if (vw / fz <= 56.25) {
      button.style.display = "none";
    } else {
      button.style.display = "flex";
    }
  });
};

window.addEventListener("resize", () => {
  toggleButtons(window.innerWidth);
});

const slidesCounter = document.querySelector("#current");
const totalSlides = swiper.slides.length;
const nextSlideBtn = document.querySelector("#next");
nextSlideBtn.addEventListener("click", (e) => {
  swiper.slideNext();
});

const prevSlideBtn = document.querySelector("#prev");
prevSlideBtn.addEventListener("click", (e) => {
  swiper.slidePrev();
});

swiper.on("realIndexChange", (e) => {
  const currentSlide = e.realIndex + 1;
  if (currentSlide < 10) {
    slidesCounter.textContent = `0${currentSlide}`;
  } else {
    slidesCounter.textContent = `${currentSlide}`;
  }
});

if (totalSlides < 10) {
  document.querySelector("#quantity").textContent = `0${totalSlides}`;
} else {
  document.querySelector("#quantity").textContent = `${totalSlides}`;
}

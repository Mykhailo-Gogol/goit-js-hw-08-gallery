import images from "./gallery-items.js";

let imageList = document.querySelector(".js-gallery");
let openModal = document.querySelector(".lightbox");
let closeModal = document.querySelector("[data-action]");
let modalImg = document.querySelector(".lightbox__image");
let modalBackdrop = document.querySelector(".lightbox__overlay");

images.forEach(({ preview, original, description }, index) => {
  let elem = document.createElement("li");
  let link = document.createElement("a");
  let img = document.createElement("img");

  elem.classList.add("gallery__item");
  elem.setAttribute("data-item", index);
  link.classList.add("gallery__link");
  link.setAttribute("data-link", index);
  link.href = original;
  img.classList.add("gallery__image");
  img.setAttribute("data-image", index);
  img.src = preview;
  img.setAttribute("data-source", original);
  img.alt = description;
  link.append(img);
  elem.append(link);
  imageList.appendChild(elem);
});

function onOpenModal(e) {
  e.preventDefault();

  let targetItems = document.querySelectorAll(".gallery__image");

  openModal.setAttribute("data-open", true);

  console.log(" :>> ", openModal.dataset.open);

  for (let targetItem of targetItems) {
    if (e.target === targetItem) {
      openModal.classList.add("is-open");
      let currentImageLink = e.target.dataset.source;
      //console.log("object :>> ", currentImageLink);
      modalImg.setAttribute("src", currentImageLink);
    }
  }

  window.addEventListener("keydown", onPressEscapeButtonClose);
  window.addEventListener("keydown", onArrowButtonsClick);
}

function onCloseModal() {
  openModal.classList.remove("is-open");
  modalImg.setAttribute("src", "");
  openModal.setAttribute("data-open", false);
  console.log(" :>> ", openModal.dataset.open);

  window.removeEventListener("keydown", onPressEscapeButtonClose);
  window.removeEventListener("keydown", onArrowButtonsClick);
}

function onBackdropClicClose(e) {
  if (e.target === modalBackdrop) {
    openModal.classList.remove("is-open");
    modalImg.setAttribute("src", "");
    openModal.setAttribute("data-open", false);
    console.log(" :>> ", openModal.dataset.open);

    window.removeEventListener("keydown", onPressEscapeButtonClose);
    window.removeEventListener("keydown", onArrowButtonsClick);
  }
}

function onPressEscapeButtonClose(e) {
  if (e.keyCode === 27) {
    openModal.classList.remove("is-open");
    modalImg.setAttribute("src", "");
    openModal.setAttribute("data-open", false);
    console.log(" :>> ", openModal.dataset.open);

    window.removeEventListener("keydown", onPressEscapeButtonClose);
    window.removeEventListener("keydown", onArrowButtonsClick);
  }
}

function onArrowButtonsClick(e) {
  console.log();
}

imageList.addEventListener("click", onOpenModal);
closeModal.addEventListener("click", onCloseModal);
modalBackdrop.addEventListener("click", onBackdropClicClose);

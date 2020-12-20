import images from "./gallery-items.js";

const imageList = document.querySelector(".js-gallery");
const openModal = document.querySelector(".lightbox");
const closeModal = document.querySelector("[data-action]");
const modalImage = document.querySelector(".lightbox__image");
const modalBackdrop = document.querySelector(".lightbox__overlay");

const imageElements = images.map(
  ({ preview, original, description }, index) => {
    const elem = document.createElement("li");
    const link = document.createElement("a");
    const img = document.createElement("img");

    elem.classList.add("gallery__item");
    link.classList.add("gallery__link");
    link.href = original;
    img.classList.add("gallery__image");
    img.src = preview;
    img.setAttribute("data-index", index);
    img.setAttribute("data-source", original);
    img.alt = description;
    link.append(img);
    elem.append(link);
    return elem;
  }
);

imageList.append(...imageElements);

imageList.addEventListener("click", onOpenModal);
closeModal.addEventListener("click", onCloseModal);
modalBackdrop.addEventListener("click", onCloseModal);

function onOpenModal(element) {
  element.preventDefault();

  if (element.target.nodeName === "IMG") {
    openModal.classList.add("is-open");
    const currentImageLink = element.target.dataset.source;
    const currentImageDescription = element.target.alt;

    modalImage.setAttribute("src", currentImageLink);
    modalImage.setAttribute("alt", currentImageDescription);
  }

  window.addEventListener("keydown", onPressEscapeButtonClose);
  window.addEventListener("keydown", onRigthButtonClick);
  window.addEventListener("keydown", onLeftButtonClick);
}

function onCloseModal() {
  openModal.classList.remove("is-open");
  modalImage.setAttribute("src", "");

  window.removeEventListener("keydown", onPressEscapeButtonClose);
  window.removeEventListener("keydown", onRigthButtonClick);
  window.removeEventListener("keydown", onLeftButtonClick);
  window.removeEventListener("keydown", onCloseModal);
}

function onPressEscapeButtonClose(element) {
  if (element.keyCode === 27) {
    onCloseModal();
  }
}

function onRigthButtonClick(action) {
  const imagesArray = [];
  images.forEach(({ original }) => {
    imagesArray.push(original);
  });

  if (action.keyCode === 39) {
    for (let i = 0; i < imagesArray.length - 1; i++) {
      let nextSrc = imagesArray[i + 1];
      let currentSrc = imagesArray[i];

      if (imagesArray[i] === modalImage.src) {
        modalImage.src = nextSrc;
        break;
      } else if (imagesArray[imagesArray.length - 1] === modalImage.src) {
        modalImage.src = currentSrc;
        break;
      }
    }
  }
}

function onLeftButtonClick(action) {
  const imagesArray = [];
  images.forEach(({ original }) => {
    imagesArray.push(original);
  });
  if (action.keyCode === 37) {
    for (let i = 0; i < imagesArray.length - 1; i++) {
      let previousSrc = imagesArray[i - 1];
      let currentSrc = imagesArray[i];
      if (imagesArray[i] === modalImage.src && i !== 0) {
        modalImage.src = previousSrc;
        break;
      } else if (imagesArray[0] === modalImage.src) {
        modalImage.src = currentSrc;
        break;
      }
    }
  }
}

/*
 * REFACTORING: Замінив let на const
 * REFACTORING: Використав спред оператор
 */

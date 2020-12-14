import images from "./gallery-items.js";

const imageList = document.querySelector(".js-gallery");
const openModal = document.querySelector(".lightbox");
const closeModal = document.querySelector("[data-action]");
const modalImg = document.querySelector(".lightbox__image");
const modalBackdrop = document.querySelector(".lightbox__overlay");

const imageElements = images.map(
  ({ preview, original, description }, index) => {
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
    return elem;
  }
);

imageList.append(...imageElements);

imageList.addEventListener("click", onOpenModal);
closeModal.addEventListener("click", onCloseModal);
modalBackdrop.addEventListener("click", onBackdropClicClose);

function onOpenModal(element) {
  element.preventDefault();

  const targetItems = document.querySelectorAll(".gallery__image");

  openModal.setAttribute("data-open", true);

  console.log(" :>> ", openModal.dataset.open);

  for (let targetItem of targetItems) {
    if (element.target === targetItem) {
      openModal.classList.add("is-open");
      const currentImageLink = element.target.dataset.source;

      modalImg.setAttribute("src", currentImageLink);
    }
  }

  window.addEventListener("keydown", onPressEscapeButtonClose);
}

function onCloseModal() {
  openModal.classList.remove("is-open");
  modalImg.setAttribute("src", "");
  openModal.setAttribute("data-open", false);
  console.log(" :>> ", openModal.dataset.open);

  window.removeEventListener("keydown", onPressEscapeButtonClose);
}

function onBackdropClicClose(element) {
  if (element.target === modalBackdrop) {
    openModal.classList.remove("is-open");
    modalImg.setAttribute("src", "");
    openModal.setAttribute("data-open", false);
    console.log(" :>> ", openModal.dataset.open);

    window.removeEventListener("keydown", onPressEscapeButtonClose);
  }
}

function onPressEscapeButtonClose(element) {
  if (element.keyCode === 27) {
    openModal.classList.remove("is-open");
    modalImg.setAttribute("src", "");
    openModal.setAttribute("data-open", false);
    console.log(" :>> ", openModal.dataset.open);

    window.removeEventListener("keydown", onPressEscapeButtonClose);
  }
}

/*
 * REFACTORING: Замінив let на const
 * REFACTORING: Замінив for на функциональний метод map
 * Виористав деструктуризацію
 * Використав спред оператор
 */

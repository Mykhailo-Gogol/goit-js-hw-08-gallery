import images from "./gallery-items.js";

let imageList = document.querySelector(".js-gallery");
let openModal = document.querySelector(".lightbox");
let closeModal = document.querySelector("[data-action]");
let modalImg = document.querySelector(".lightbox__image");

images.forEach(({ preview, original, description }) => {
  let elem = document.createElement("li");
  let link = document.createElement("a");
  let img = document.createElement("img");

  elem.classList.add("gallery__item");
  link.classList.add("gallery__link");
  link.href = original;
  img.classList.add("gallery__image");
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

  for (let targetItem of targetItems) {
    if (e.target === targetItem) {
      openModal.classList.add("is-open");
      let currentImageLink = e.target.dataset.source;
      console.log("object :>> ", currentImageLink);
      modalImg.setAttribute("src", currentImageLink);
    }
  }
}

function onCloseModal() {
  openModal.classList.remove("is-open");
  modalImg.setAttribute("src", "");
}

imageList.addEventListener("click", onOpenModal);
closeModal.addEventListener("click", onCloseModal);

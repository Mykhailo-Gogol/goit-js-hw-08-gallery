import images from "./gallery-items.js";

let imageList = document.querySelector(".js-gallery");

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

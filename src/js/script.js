import galleryItems from "./app.js";

const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".lightbox");
const backdrop = document.querySelector(".lightbox__overlay");
const overlayImage = document.querySelector(".lightbox__image");
let currentIndex = 0;

const renderGallery = () => {
  gallery.innerHTML = galleryItems
    .map(
      (item, index) =>
        `<li class="gallery__item">
          <a
            class="gallery__link"
            href="${item.original}"
          >
            <img
              class="gallery__image"
              src="${item.preview}"
              data-source="${item.original}"
              data-index = ${index}
              alt="Tulips"
            />
          </a>
        </li>`
    )
    .join("");
};
renderGallery();

const galleryOverlayOpen = (event) => {
  event.preventDefault();
  if (event.target.tagName === "IMG") {
    const imageSrc = event.target.dataset.source;

    overlay.classList.add("is-open");
    overlayImage.src = imageSrc;
    currentIndex = Number(event.target.dataset.index);
  }
};

const galleryOverlayClose = (event) => {
  if (
    event.target.dataset.action === "close-lightbox" ||
    event.target === backdrop ||
    event.code === "Escape"
  ) {
    overlay.classList.remove("is-open");
    overlayImage.src = "";
  }
};

const galleryOverlaySwitch = (event) => {
  if (
    !overlay.classList.contains("is-open") ||
    !event.target.tagName === "BUTTON"
  )
    return;

  if (
    event.target.dataset.action === "left-lightbox" ||
    event.code === "ArrowLeft"
  ) {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  }

  if (
    event.target.dataset.action === "right-lightbox" ||
    event.code === "ArrowRight"
  ) {
    currentIndex = (currentIndex + 1) % galleryItems.length;
  }
  overlayImage.src = galleryItems[currentIndex].original;
};
overlay.addEventListener("click", galleryOverlayClose);
window.addEventListener("keydown", galleryOverlayClose);
gallery.addEventListener("click", galleryOverlayOpen);
overlay.addEventListener("click", galleryOverlaySwitch);
window.addEventListener("keydown", galleryOverlaySwitch);

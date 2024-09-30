import galleryItems from "./app.js";

const gallery = document.querySelector(".js-gallery");
gallery.innerHTML = galleryItems
  .map(
    (element) => `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${element.original}"
    
  >
    <img
      class="gallery__image"
      src="${element.preview}"
    //   data-source="${element.original}"
      alt="Tulips"
    />
  </a>
</li>`
  )
  .join("");
gallery.addEventListener("click", (event) => {
  event.preventDefault();
});

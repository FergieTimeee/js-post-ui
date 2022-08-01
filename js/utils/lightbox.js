function showModal(modalElement) {
  if (!modalElement) return;
  const myModal = new window.bootstrap.Modal(modalElement);
  if (myModal) myModal.show();
}
export function registerLightbox({ modalId, imageSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId);
  //   console.log('🚀 ~ file: lightbox.js ~ line 7 ~ registerLightbox ~ modalElement', modalElement);
  if (!modalElement) return;

  if (Boolean(modalElement.dataset.registered)) return;
  //selector
  const imageElement = document.querySelector(imageSelector);
  //   console.log('🚀 ~ file: lightbox.js ~ line 13 ~ registerLightbox ~ imageElement', imageElement);
  const prevElement = document.querySelector(prevSelector);
  //   console.log('🚀 ~ file: lightbox.js ~ line 15 ~ registerLightbox ~ prevElement', prevElement);
  const nextElement = document.querySelector(nextSelector);
  //   console.log('🚀 ~ file: lightbox.js ~ line 17 ~ registerLightbox ~ nextElement', nextElement);
  if (!imageElement || !prevElement || !nextElement) return;

  //   lightbox vars
  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  //handle click for all Img --> Event Delegation
  //img click --> find all imgs with the same album / gallery
  //determine index of selected img
  //show modal with selected img
  //handle prev/next click

  document.addEventListener('click', (event) => {
    // console.log(event.target);
    const { target } = event;
    if (target.tagName !== 'IMG' || !target.dataset.album) return;
    //img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
    currentIndex = [...imgList].findIndex((img) => img === target);
    console.log({ target, imgList, currentIndex });

    showImageAtIndex(currentIndex);
    showModal(modalElement);
  });
  prevElement.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    showImageAtIndex(currentIndex);
  });
  nextElement.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgList.length;
    showImageAtIndex(currentIndex);
  });
  modalElement.dataset.registered = 'true';
}

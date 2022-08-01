import dayjs from 'dayjs';
import postApi from './api/postApi';
import { setTextContent, registerLightbox } from './utils';

function renderPostDetail(post) {
  if (!post) return;
  //render title
  setTextContent(document, '#postDetailTitle', post.title);
  //render description
  setTextContent(document, '#postDetailDescription', post.description);
  //render author
  setTextContent(document, '#postDetailAuthor', post.author);
  //render updatedAt
  setTextContent(document, '#postDetailTimeSpan', dayjs(post.updatedAt).format('- DD / MM / YYYY'));
  //render hero image
  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;
    heroImage.addEventListener('error', () => {
      heroImage.style.backgroundImage =
        'url("https://via.placeholder.com/1368x400?text=thumbnail")';
    });
  }
  //render edit pageLink
  const editPageLink = document.getElementById('goToEditPageLink');
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id${post.id}`;
    // editPageLink.textContent = 'EditPost';
    editPageLink.innerHTML = '<i class="fas fa-edit"></i> EditPost';
  }
}

//Main
(async () => {
  registerLightbox({
    modalId: 'lightbox',
    imageSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  });
  //get post id form URL
  //fetch post detail API
  //render post detail

  try {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams);
    const postId = searchParams.get('id');
    console.log(postId);
    if (!postId) {
      console.log('post not found');
      return;
    }
    const post = await postApi.getById(postId);
    renderPostDetail(post);
  } catch (error) {
    console.log('🚀 ~ file: post-detail.js ~ line 6 ~ error', error);
  }
})();

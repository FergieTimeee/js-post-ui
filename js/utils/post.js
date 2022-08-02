import { setTextContent, truncateText } from './common';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//to use fromNow function
dayjs.extend(relativeTime);
export function createElement(post) {
  if (!post) return;

  //find clone template
  const postItemTemplate = document.getElementById('postItemTemplate');

  if (!postItemTemplate) return;

  const liElement = postItemTemplate.content.firstElementChild.cloneNode(true);

  if (!liElement) return;

  //update title,description,author,thumbnail
  // const titleElement = liElement.querySelector('[data-id="title"]');
  // if (titleElement) titleElement.textContent = post.title;
  setTextContent(liElement, '[data-id="title"]', post.title);
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 120));
  setTextContent(liElement, '[data-id="author"]', post.author);

  // const descriptionElement = liElement.querySelector('[data-id="description"]');
  // if (descriptionElement) descriptionElement.textContent = post.description;

  // const authorElement = liElement.querySelector('[data-id="author"]');
  // if (authorElement) authorElement.textContent = post.author;

  //calculate times
  //dayjs(post.updateAt).fromNow();
  // console.log(
  //   '🚀 ~ file: home.js ~ line 33 ~ createElement ~ dayjs(post.updatedAt).fromNow()',
  //   dayjs(post.updatedAt).fromNow()
  // );
  setTextContent(liElement, '[data-id="timeSpan"]', `- ${dayjs(post.updatedAt).fromNow()}`);
  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');

  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail';
    });
  }

  const divElement = liElement.firstElementChild?.firstElementChild;
  divElement.addEventListener('click', (event) => {
    //if event trigger from menu --> ignore
    const menu = liElement.querySelector('[data-id="menu]');
    if (menu && menu.contains(event.target)) return;
    console.log('parent click');
    window.location.assign(`/post-detail.html?id=${post.id}`);
  });

  //add click event for edit button
  const editButton = liElement.querySelector('[data-id="edit"]');
  if (editButton) {
    editButton.addEventListener('click', () => {
      console.log('edit click');
      // e.stopPropagation();
      window.location.assign(`/add-edit-post.html?id=${post.id}`);
    });
  }
  //attach Event
  return liElement;
}

export function renderPostList(elementId, postList) {
  //console.log('🚀 ~ file: home.js ~ line 6 ~ renderPostList ~ postList', { postList });
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  //clear current list
  ulElement.textContent = '';

  postList.forEach((post) => {
    const liElement = createElement(post);
    ulElement.appendChild(liElement);
  });
}

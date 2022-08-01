export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);

  if (!ulPagination || !pagination) return;
  //calc totalPages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  // console.log(totalPages);

  //save page and  totalPages to ulPagination
  ulPagination.dataset.page = _page;
  console.log(ulPagination.dataset.page);
  ulPagination.dataset.totalPages = totalPages;
  //check if enable/disable prev links
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled');
  else ulPagination.firstElementChild?.classList.remove('disable');
  //check if enable/disable next links
  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled');
  else ulPagination.lastElementChild?.classList.remove('disable');
}

export function initPagination({ elementId, defaultParams, onChange }) {
  const ulPagination = document.getElementById(elementId);
  // console.log(ulPagination);
  if (!ulPagination) return;

  //add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  // console.log('🚀 ~ file: home.js ~ line 82 ~ initPagination ~ prevLink', prevLink);
  if (prevLink) {
    prevLink.addEventListener('click', (event) => {
      event.preventDefault();

      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      if (page > 2) onChange?.(page - 1);
    });
  }

  //add click event for next link
  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener('click', (event) => {
      event.preventDefault();

      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      const totalPages = ulPagination.dataset.totalPages;
      if (page < totalPages) onChange?.(page + 1);
    });
  }
}

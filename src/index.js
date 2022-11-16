import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

const refs = {
  form: document.querySelector('#search-form'),
  icon: document.querySelector('[data-icon]'),
  gallery: document.querySelector('.gallery'),
};

const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  try {
    fetchData(searchQuery).then(data => {
      const picsArr = data.hits;
      if (picsArr.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          notifySettings
        );
        return;
      }
      refs.gallery.innerHTML = '';
      const markUp = createMarkUp(picsArr);
      refs.gallery.insertAdjacentHTML('beforeend', markUp);
    });
  } catch {
    er => {
      console.log(er);
    };
  }
  // refs.spinner.classList.remove('visually-hidden');

  refs.form.reset();
}

async function fetchData(searchQuery) {
  const API_KEY = '30742354-1ccc482155368d7c8e305125c';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  const response = await fetch(url);
  if (response.status === 404) {
    // refs.spinner.classList.toggle('visually-hidden');
    Notify.failure('Oops, no pics found. Please try again', notifySettings);
    return Promise.reject();
  }
  return await response.json();
}

function createMarkUp(pics) {
  return pics
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="result__item">
<div class="result__img-wrapper photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy" class="result__img image-display"/>
<div class="info result__info"> 
<p class="info-item result__info-item">
<b>Likes</b><br>
<span class="result__text">${likes}</span>
</p>
<p class="info-item result__info-item">
<b>Views</b><br>
<span class="result__text">${views}</span>
</p>
<p class="info-item result__info-item">
<b>Comments</b><br>
<span class="result__text">${comments}</span>
</p>
<p class="info-item result__info-item">
<b>Downloads</b><br>
<span class="result__text">${downloads}</span>
</p>
</div>
</div>
</li>`
    )
    .join('');
}

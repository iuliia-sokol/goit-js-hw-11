import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import { createMarkUp } from './js/createMarkUp';
import { refs } from './js/refs';
import { fetchData } from './js/fetch';
import { notifySettings } from './js/notifySettings';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

let searchQuery = null;
let pageStart = 1;

function onFormSubmit(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value;

  try {
    fetchData(searchQuery, pageStart).then(data => {
      console.log(data);
      const total = data.totalHits;
      const picsArr = data.hits;
      const picsLeft = total - picsArr.length * pageStart;
      console.log(picsLeft);

      Notify.success(`Hooray! We found ${total} images.`, notifySettings);

      if (picsArr.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          notifySettings
        );
        refs.gallery.innerHTML = '';
        return;
      }

      if (picsLeft > 0) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }

      refs.gallery.innerHTML = '';

      const markUp = createMarkUp(picsArr);
      refs.gallery.insertAdjacentHTML('beforeend', markUp);
      pageStart = pageStart + 1;
    });
  } catch {
    er => {
      console.log(er);
    };
  }
  // refs.spinner.classList.remove('visually-hidden');

  refs.form.reset();
}

function onLoadMoreBtnClick() {
  try {
    fetchData(searchQuery, pageStart).then(data => {
      const total = data.totalHits;
      const picsArr = data.hits;
      const picsLeft = total - 40 * pageStart;
      console.log(picsLeft);

      const markUp = createMarkUp(picsArr);
      refs.gallery.insertAdjacentHTML('beforeend', markUp);

      if (picsLeft <= 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          notifySettings
        );
        pageStart = 1;
        return;
      }

      pageStart = pageStart + 1;
    });
  } catch {
    er => {
      console.log(er);
    };
  }
}

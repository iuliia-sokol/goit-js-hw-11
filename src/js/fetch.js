import axios from 'axios';

export async function fetchData(searchQuery, pageStart) {
  const API_KEY = '30742354-1ccc482155368d7c8e305125c';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageStart,
    per_page: 40,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  const response = await axios.get(url);
  if (response.status === 404) {
    Notify.failure('Oops, no pics found. Please try again', notifySettings);
    return Promise.reject();
  }
  return response;
}

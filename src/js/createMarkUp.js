export function createMarkUp(pics) {
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

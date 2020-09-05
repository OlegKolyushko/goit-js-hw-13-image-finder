import './styles.css';
import fetchApi from './js/fetchApi.js';
import imageCard from './template/imageCard.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('#loadmore'),
};
refs.loadMoreBtn.hidden = true;


refs.searchForm.addEventListener('submit', searchFormSubmitBtnClick);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnClick);

function searchFormSubmitBtnClick(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.query;
  clearGalleryList();
  fetchApi.resetPage();
  fetchApi.searchQuery = input.value;
  fetchApi.fetchRequest().then(data=> insertMarkupData(data));
  refs.loadMoreBtn.hidden = false;

};

function clearGalleryList(){
  refs.gallery.innerHTML = '';
};

function insertMarkupData(arr){
  if(arr.length === 0){
    return;
  }
  const markup = imageCard(arr);
  // console.log(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};


function loadMoreBtnClick(e){
  fetchApi.fetchRequest().then(data=> insertMarkupData(data));
  scrolling();
};

function scrolling(e){
  window.scrollTo(
    {
      top: window.innerHeight + window.pageYOffset,
      behavior: 'smooth',
    });
 };




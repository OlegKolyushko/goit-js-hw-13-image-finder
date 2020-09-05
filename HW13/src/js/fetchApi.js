const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '18183853-b5401f44aa1398f977df87bc0';

export default {
  pageNumber: 1,
  query: '',
  fetchRequest() {
    const requestParam = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`;
    return fetch(BASE_URL + requestParam)
      .then(response => response.json())
      .then(data => { 
        this.incrementPage()
        return data.hits
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.pageNumber += 1;
  },
  resetPage() {
    this.pageNumber = 1;
  },
};

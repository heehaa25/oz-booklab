import axios from 'axios';

const AUTH_KEY = import.meta.env.VITE_BOOKS_API_KEY;

const instance = axios.create({
  baseURL: 'https://data4library.kr/api',
  timeout: 3000,
});

export async function getBookData() {
  const response = await instance.get('/loanItemSrch', {
    params: {
      authKey: AUTH_KEY,
      startDt: '2025-07-01',
      from_age: 20,
      pageSize: 100,
      format: 'json',
    },
  });

  return response.data.response.docs;
}

export async function getBookDetail(id) {
  const response = await instance.get('/srchDtlList', {
    params: {
      authKey: AUTH_KEY,
      isbn13: id,
      format: 'json',
    },
  });

  const data = response.data.response.detail.map((b) => b.book.description);
  return data;
}

export async function getSearch(title) {
  const response = await instance.get('/srchBooks', {
    params: {
      authKey: AUTH_KEY,
      keyword: title,
      format: 'json',
    },
  });

  const data = response.data.response.docs.map((item) => item.doc);
  return data;
}

// mock
export async function getMockData() {
  const response = await axios.get('/data/popular.json');
  return response.data.response.docs;
}

export async function getMockDetail() {
  const response = await axios.get('../data/detail.json');
  const data = response.data.response.detail.map((b) => b.book.description);
  return data;
}

export async function getMockSearch() {
  const response = await axios.get('../data/search.json');

  const data = response.data.response.docs.map((item) => item.doc);
  return data;
}

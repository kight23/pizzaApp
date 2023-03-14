import {create} from 'apisauce';

export const api = create({
  baseURL: 'https://localhost:5000/',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
});

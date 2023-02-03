import axios from 'axios';
import apiUrl from './apiUrl';

axios.defaults.baseURL = apiUrl.baseUrl;

export const postReq = (url, data = null, accessToken = null) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url,
      data,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error.response.data);
      });
  });
};

export const profileImageReq = (url, data = null, accessToken = null) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url,
      data: data,
      headers: {
        accept: 'application/json',
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error.response.data);
      });
  });
};

export const getReq = (url, accessToken = null) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error.response.data);
      });
  });
};

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
        Accept: 'application/json',
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
      data,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'multipart/form-data',
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
        Accept: 'application/json',
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

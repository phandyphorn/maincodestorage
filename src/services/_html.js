import apisauce from 'apisauce';
import qs from 'qs';
import firebase from 'firebase';

let currentHost;
let apiKey;

const xmlHttp = new XMLHttpRequest();
xmlHttp.open('GET', '/config/env.json', false);
xmlHttp.send(null);
try {
  const envVariable = JSON.parse(xmlHttp.responseText);
  currentHost = envVariable.apiUrl;
  apiKey = envVariable.apiKey;
} catch (e) {
  currentHost = 'https://be-dev.komjey.com/';
  apiKey = 'JckDvdfjaJQdTpds';
}

export const api = apisauce.create({
  baseURL: currentHost,
  timeout: 60000,
});

api.addAsyncRequestTransform(async (request) => {
  let { headers } = request.headers;
  if (headers) {
    headers['Api-Key'] = apiKey;
  } else {
    headers = { 'Api-Key': apiKey };
  }
  const token = await firebase.auth().currentUser?.getIdToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  request.headers = headers;
});

api.addResponseTransform((response) => {
  const { status } = response;
  if (status === 403 || status === 401) {
    firebase.auth().signOut();
  }
});

export default {
  get: async (url, params) => api.get(url, params),
  del: async (url) => api.delete(url, null),
  put: async (url, body, headers) =>
    api.put(url, qs.stringify(body, { encode: true }), headers),
  putJson: async (url, body, headers) => api.put(url, JSON.stringify(body), headers),
  post: async (url, body, headers) =>
    api.post(url, qs.stringify(body, { encode: true }), headers),
  postJson: async (url, body, headers) =>
    api.post(url, JSON.stringify(body), headers),
  postImage: async (url, image, headers) => api.post(url, image, headers),
};

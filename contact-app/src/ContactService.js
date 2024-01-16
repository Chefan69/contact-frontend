/* // ContactService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your backend API URL

const createContact = (userId, contactData) => {
  return axios.post(`${API_URL}/contact/${userId}`, contactData);
};

const getAllContactsByUserId = (userId) => {
  return axios.get(`${API_URL}/contacts/${userId}`);
};

const getContactById = (contactId) => {
  return axios.get(`${API_URL}/contact/${contactId}`);
};

const updateContact = (contactId, contactData) => {
  return axios.put(`${API_URL}/contact/${contactId}`, contactData);
};

const deleteContact = (contactId) => {
  return axios.delete(`${API_URL}/contact/${contactId}`);
};

const checkUsernameAvailability = (username) => {
  return axios.get(`${API_URL}/check-username/${username}`);
};

export default {
  createContact,
  getAllContactsByUserId,
  getContactById,
  updateContact,
  deleteContact,
  checkUsernameAvailability,
};


 */


 

import axios from 'axios';

const API_URL = 'http://localhost:8080';

const getAllContactsByUserId = (userId) => {
  return axios.get(`${API_URL}/contacts/${userId}`);
};

const getContactById = (contactId) => {
  return axios.get(`${API_URL}/contact/${contactId}`);
};

const createContact = (userId, contactData) => {
  return axios.post(`${API_URL}/contact/${userId}`, contactData);
};

const updateContact = (contactId, contactData) => {
  return axios.put(`${API_URL}/contact/${contactId}`, contactData);
};

const deleteContact = (contactId) => {
  return axios.delete(`${API_URL}/contact/${contactId}`);
};

export default {
  getAllContactsByUserId,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
  
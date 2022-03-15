import axios from "axios";

// configs
import { API_URL, TOKEN_KEY } from "../../config/index";

console.log("API URL", API_URL);

/**
 * Set axios globals
 */
axios.defaults.headers.common["Accept"] = "application/json";

/**
 * Set Local Storage
 */
export const setLocalStrge = (key: string, value: any) => {
  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
    return;
  }
  localStorage.setItem(key, value);
  return;
};

/**
 * Get Local Storage
 */
export const getLocalStrge = (key: string) => {
  return localStorage.getItem(key) !== null ? localStorage.getItem(key) : null;
};

/**
 * Clear Local Storage
 */
export const clearLocalStorage = () => {
  localStorage.clear();
  return;
};

const unauthHeadersJson = () => {
  return {
    headers: {
      "content-type": "application/json",
    },
  };
};

const unauthMultipartHeaders = () => {
  return {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
};

const authMultipartHeaders = () => {
  return {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${getLocalStrge(TOKEN_KEY)}`,
    },
  };
};

// av_services/feedback/feedback_crud/fetch_by_id
export const fetchFeedbackById = async (params: any) => {
  return await axios.get(
    // "http://av-services.ddns.net/" +
    // "http://abfrl-adityabirla.ddns.net/" +
    "http://abfrlsurvey.ddns.net/" +
      API_URL +
      "/av_services/feedback/feedback_crud/fetch_by_id",
    { params }
  );
};

// av_services/feedback/feedback_crud/submit
export const submitFeedback = async (form: any) => {
  return await axios.post(
    // "http://av-services.ddns.net/" +
    // "http://abfrl-adityabirla.ddns.net/" +
    "http://abfrlsurvey.ddns.net/" +
      API_URL +
      "/av_services/feedback/feedback_crud/submit",
    form,
    unauthMultipartHeaders()
  );
};

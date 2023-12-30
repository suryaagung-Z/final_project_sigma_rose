import { getBaseUrl } from "./utils";
const BASH_URL = getBaseUrl();
import axios from "axios";
import getCookieValue from "./getCookie";
const tokenCookie = getCookieValue("token");

export const postLogin = async (payload) => {
  try {
    const response = await axios.post(`${BASH_URL}/auth/login`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCourses = async () => {
  try {
    const response = await axios.get(`${BASH_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${tokenCookie}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${BASH_URL}/notification/user`, {
      headers: {
        Authorization: `Bearer ${tokenCookie}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const putNotification = async (userId) => {
  try {
    const response = await axios.put(
      `${BASH_URL}/notification/user`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookie}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const putNotificationId = async (id) => {
  try {
    const response = await axios.put(
      `${BASH_URL}/notification`,
      { notificationId: id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookie}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

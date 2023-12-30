import { getBaseUrl } from "./utils";
const BASH_URL = getBaseUrl();
import axios from "axios";
import getCookieValue from "./getCookie";
const tokenCookie = getCookieValue("token");

export const consumeUserApi = {
  getCurrentUser: async () => {
    try {
      const res = await axios.get(`${BASH_URL}/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  },

  updateUser: async (payload) => {
    try {
      const res = await axios.put(`${BASH_URL}/users`, payload, {
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  },

  updatePassword: async (payload) => {
    try {
      const res = await axios.put(
        `${BASH_URL}/users/change-password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${tokenCookie}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error) {
      return error;
    }
  },

  resetPassword: async (payload) => {
    try {
      const res = await axios.put(`${BASH_URL}/auth/reset-password`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  },

  resetPasswordValidation: async (payload, token) => {
    try {
      const res = await axios.put(
        `${BASH_URL}/auth/reset-password/${token}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error) {
      return error;
    }
  },
};

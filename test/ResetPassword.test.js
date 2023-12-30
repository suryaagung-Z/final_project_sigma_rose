import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Reset from "../src/pages/Reset";
import ResetPassword from "../src/components/ResetPassword/ResetPassword";
import ButtonReset from "../src/components/Button/ButtonReset";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { getBaseUrl } from "../src/api/utils";
const BASE_URL = getBaseUrl();
import { consumeUserApi } from "../src/api/user";
import getCookieValue from "../src/api/getCookie";
const tokenCookie = getCookieValue("token");

jest.mock("axios");
jest.useFakeTimers();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../src/api/utils", () => ({
  getBaseUrl: () => "https://binar-project-production.up.railway.app",
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Reset component correctly", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Reset />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("logo-1")).toBeInTheDocument();
      expect(screen.getByTestId("logo-2")).toBeInTheDocument();
    });
  });

  it("renders ResetPassword component inside Reset", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByTestId("reset-password-component")
      ).toBeInTheDocument();
    });
  });

  describe("Alert Reset", () => {
    it("should display error message for empty fields", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <ResetPassword />
          </BrowserRouter>
        );
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId("button-reset"));
      });

      await waitFor(() => {
        expect(screen.getByTestId("alertreset")).toBeInTheDocument();
      });
    });

    it("should set alertAction to false after 5000 milliseconds", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <ResetPassword />
          </BrowserRouter>
        );
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId("button-reset"));
      });
      await waitFor(() => {
        expect(screen.getByTestId("alertreset")).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      await waitFor(() => {
        expect(screen.queryByTestId("alertreset")).toBeNull();
      });
    });
  });

  describe("getCookieValue", () => {
    beforeEach(() => {
      document.cookie = "";
    });

    it("returns null when the cookie is not found", () => {
      const result = getCookieValue("sampleCookie");
      expect(result).toBeNull();
    });

    it("returns the correct value when the cookie is found", () => {
      document.cookie = "sampleCookie=sampleValue";
      const result = getCookieValue("sampleCookie");
      expect(result).toBe("sampleValue");
    });
  });

  describe("consumeUserApi", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("getCurrentUser", () => {
      it("should call getCurrentUser API correctly", async () => {
        const mockResponse = { username: "john_doe" };
        axios.get.mockResolvedValueOnce({ data: mockResponse });

        const response = await consumeUserApi.getCurrentUser();

        expect(axios.get).toHaveBeenCalledWith(
          `${BASE_URL}/auth/current-user`,
          {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });

      it("should handle errors when calling getCurrentUser API", async () => {
        const mockError = new Error("An error occurred");
        axios.get.mockRejectedValueOnce(mockError);

        try {
          await consumeUserApi.getCurrentUser();
        } catch (error) {
          expect(axios.get).toHaveBeenCalledWith(
            `${BASE_URL}/auth/current-user`,
            {
              headers: {
                Authorization: `Bearer ${tokenCookie}`,
                "Content-Type": "application/json",
              },
            }
          );
          expect(error).toEqual(mockError);
        }
      });
    });

    describe("updateUser", () => {
      it("should call updateUser API correctly", async () => {
        const mockPayload = { username: "new_username" };
        const mockResponse = { success: true };
        axios.put.mockResolvedValueOnce({ data: mockResponse });

        const response = await consumeUserApi.updateUser(mockPayload);

        expect(axios.put).toHaveBeenCalledWith(
          `${BASE_URL}/users`,
          mockPayload,
          {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });

      it("should handle errors when calling updateUser API", async () => {
        const mockPayload = { username: "new_username" };
        const mockError = new Error("An error occurred");
        axios.put.mockRejectedValueOnce(mockError);

        try {
          await consumeUserApi.updateUser(mockPayload);
        } catch (error) {
          expect(axios.put).toHaveBeenCalledWith(
            `${BASE_URL}/users`,
            mockPayload,
            {
              headers: {
                Authorization: `Bearer ${tokenCookie}`,
                "Content-Type": "application/json",
              },
            }
          );
          expect(error).toEqual(mockError);
        }
      });
    });

    describe("updatePassword", () => {
      it("should call updatePassword API correctly", async () => {
        const mockPayload = { newPassword: "new_password" };
        const mockResponse = { success: true };
        axios.put.mockResolvedValueOnce({ data: mockResponse });

        const response = await consumeUserApi.updatePassword(mockPayload);

        expect(axios.put).toHaveBeenCalledWith(
          `${BASE_URL}/users/change-password`,
          mockPayload,
          {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });

      it("should handle errors when calling updatePassword API", async () => {
        const mockPayload = { newPassword: "new_password" };
        const mockError = new Error("An error occurred");
        axios.put.mockRejectedValueOnce(mockError);

        try {
          await consumeUserApi.updatePassword(mockPayload);
        } catch (error) {
          expect(axios.put).toHaveBeenCalledWith(
            `${BASE_URL}/users/change-password`,
            mockPayload,
            {
              headers: {
                Authorization: `Bearer ${tokenCookie}`,
                "Content-Type": "application/json",
              },
            }
          );
          expect(error).toEqual(mockError);
        }
      });
    });

    describe("resetPassword", () => {
      it("should call resetPassword API correctly", async () => {
        const mockPayload = { email: "user@example.com" };
        const mockResponse = { success: true };
        axios.put.mockResolvedValueOnce({ data: mockResponse });

        const response = await consumeUserApi.resetPassword(mockPayload);

        expect(axios.put).toHaveBeenCalledWith(
          `${BASE_URL}/auth/reset-password`,
          mockPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });

      it("should handle errors when calling resetPassword API", async () => {
        const mockPayload = { email: "user@example.com" };
        const mockError = new Error("An error occurred");
        axios.put.mockRejectedValueOnce(mockError);

        try {
          await consumeUserApi.resetPassword(mockPayload);
        } catch (error) {
          expect(axios.put).toHaveBeenCalledWith(
            `${BASE_URL}/auth/reset-password`,
            mockPayload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          expect(error).toEqual(mockError);
        }
      });
    });

    describe("resetPasswordValidation", () => {
      it("should call resetPasswordValidation API correctly", async () => {
        const mockPayload = { newPassword: "new_password" };
        const mockToken = "reset_token";
        const mockResponse = { success: true };
        axios.put.mockResolvedValueOnce({ data: mockResponse });

        const response = await consumeUserApi.resetPasswordValidation(
          mockPayload,
          mockToken
        );

        expect(axios.put).toHaveBeenCalledWith(
          `${BASE_URL}/auth/reset-password/${mockToken}`,
          mockPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });

      it("should handle errors when calling resetPasswordValidation API", async () => {
        const mockPayload = { newPassword: "new_password" };
        const mockToken = "reset_token";
        const mockError = new Error("An error occurred");
        axios.put.mockRejectedValueOnce(mockError);

        try {
          await consumeUserApi.resetPasswordValidation(mockPayload, mockToken);
        } catch (error) {
          expect(axios.put).toHaveBeenCalledWith(
            `${BASE_URL}/auth/reset-password/${mockToken}`,
            mockPayload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          expect(error).toEqual(mockError);
        }
      });
    });
  });
});

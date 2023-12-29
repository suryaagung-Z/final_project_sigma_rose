import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/pages/Login";
import LoginForm from "../src/components/LoginAndRegister/LoginForm";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import {
  postLogin,
  getCourses,
  getNotifications,
  putNotification,
  putNotificationId,
} from "../src/api/servicesApi";
import { SERVER_URL } from "../src/lib/constants";
import getCookieValue from "../src/api/getCookie";
const tokenCookie = getCookieValue("token");

jest.mock("axios");
jest.useFakeTimers();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPayload = {
    emailOrPhone: "john@gmail.com",
    password: "0851123456",
  };

  it("render Login element", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("logo-1")).toBeInTheDocument();
      expect(screen.getByTestId("logo-2")).toBeInTheDocument();
    });
  });

  it("render form component", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("login-form")).toBeInTheDocument();
      expect(screen.getByTestId("input-mail-phone")).toBeInTheDocument();
      expect(screen.getByTestId("input-password")).toBeInTheDocument();
      expect(screen.getByTestId("button-login")).toBeInTheDocument();
    });
  });

  it("should display error message for empty fields", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      userEvent.click(screen.getByTestId("button-login"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("alertreset")).toBeInTheDocument();
    });
  });

  it("should set alertAction to false after 5000 milliseconds", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      userEvent.click(screen.getByTestId("button-login"));
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

  describe("Input change", () => {
    it("should update state on email/phone input change", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        );
      });

      await act(async () => {
        const emailInput = screen.getByTestId("input-mail-phone");
        fireEvent.change(emailInput, {
          target: { value: "john.doe@example.com" },
        });
      });

      expect(screen.getByTestId("input-mail-phone").value).toBe(
        "john.doe@example.com"
      );
    });

    it("should update state on password input change", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        );
      });

      await act(async () => {
        const passwordInput = screen.getByTestId("input-password");
        fireEvent.change(passwordInput, {
          target: { value: "securepassword" },
        });
      });

      expect(screen.getByTestId("input-password").value).toBe("securepassword");
    });
  });

  it("should navigate to /resettautan when 'Lupa Kata Sandi' is clicked", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("btn-resetpw"));
    });

    expect(mockNavigate).toHaveBeenCalledWith("/resettautan");
  });

  it("should navigate to /Register when 'Belum punya akun? Daftar di sini' is clicked", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("button-register"));
    });

    expect(mockNavigate).toHaveBeenCalledWith("/Register");
  });

  describe("OnSubmit", () => {
    describe("Services API", () => {
      // postLogin
      it("should call postLogin API correctly", async () => {
        const mockResponse = {};
        axios.post.mockResolvedValueOnce(mockResponse);

        const response = await postLogin(mockPayload);

        expect(axios.post).toHaveBeenCalledWith(
          `${SERVER_URL}/auth/login`,
          mockPayload
        );
        expect(response).toEqual(mockResponse);
      });
      it("should handle errors when calling postLogin API", async () => {
        const mockError = new Error("An error occurred");
        axios.post.mockRejectedValueOnce(mockError);

        try {
          await postLogin(mockPayload);
        } catch (error) {
          expect(axios.post).toHaveBeenCalledWith(
            `${SERVER_URL}/auth/login`,
            mockPayload
          );
          expect(error).toEqual(mockError);
        }
      });

      // getCourses
      it("should call getCourses API correctly", async () => {
        const mockResponse = {};
        axios.get.mockResolvedValueOnce(mockResponse);

        const response = await getCourses();

        expect(axios.get).toHaveBeenCalledWith(`${SERVER_URL}/courses`, {
          headers: {
            Authorization: `Bearer ${tokenCookie}`,
            "Content-Type": "application/json",
          },
        });
        expect(response).toEqual(mockResponse);
      });
      it("should handle errors when calling getCourses API", async () => {
        const mockError = new Error("An error occurred");
        axios.get.mockRejectedValueOnce(mockError);

        try {
          await getCourses();
        } catch (error) {
          expect(axios.get).toHaveBeenCalledWith(`${SERVER_URL}/courses`, {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          });
          expect(error).toEqual(mockError);
        }
      });

      // getNotifications
      it("should call getNotifications API correctly", async () => {
        const mockResponse = {};
        axios.get.mockResolvedValueOnce(mockResponse);

        const response = await getNotifications();

        expect(axios.get).toHaveBeenCalledWith(
          `${SERVER_URL}/notification/user`,
          {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });
      it("should handle errors when calling getNotifications API", async () => {
        const mockError = new Error("An error occurred");
        axios.get.mockRejectedValueOnce(mockError);

        try {
          await getNotifications();
        } catch (error) {
          expect(axios.get).toHaveBeenCalledWith(
            `${SERVER_URL}/notification/user`,
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

      // putNotification
      it("should call putNotification API correctly", async () => {
        const userId = "123";
        const mockResponse = {};
        axios.put.mockResolvedValueOnce(mockResponse);

        const response = await putNotification(userId);

        expect(axios.put).toHaveBeenCalledWith(
          `${SERVER_URL}/notification/user`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });
      it("should handle errors when calling putNotification API", async () => {
        const userId = "123";
        const mockError = new Error("An error occurred");
        axios.put.mockRejectedValueOnce(mockError);

        try {
          await putNotification(userId);
        } catch (error) {
          expect(axios.put).toHaveBeenCalledWith(
            `${SERVER_URL}/notification/user`,
            { userId },
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

      // putNotificationId
      it("should call putNotificationId API correctly", async () => {
        const id = "123";
        const mockResponse = {};
        axios.put.mockResolvedValueOnce(mockResponse);

        const response = await putNotificationId(id);

        expect(axios.put).toHaveBeenCalledWith(
          `${SERVER_URL}/notification`,
          { notificationId: id },
          {
            headers: {
              Authorization: `Bearer ${tokenCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        expect(response).toEqual(mockResponse);
      });
      it("should handle errors when calling putNotificationId API", async () => {
        const id = "123";
        const mockError = new Error("An error occurred");
        axios.put.mockRejectedValueOnce(mockError);

        try {
          await putNotificationId(id);
        } catch (error) {
          expect(axios.put).toHaveBeenCalledWith(
            `${SERVER_URL}/notification`,
            { notificationId: id },
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
});

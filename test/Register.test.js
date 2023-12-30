import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Register from "../src/pages/Register";
import RegisterForm from "../src/components/LoginAndRegister/RegisterForm";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../src/lib/constants";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders RegisterForm component", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("logo-1")).toBeInTheDocument();
      expect(screen.getByTestId("logo-2")).toBeInTheDocument();
      expect(screen.getByTestId("register-form")).toBeInTheDocument();
    });
  });

  // it("renders logos", async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <Register />
  //       </BrowserRouter>
  //     );
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByTestId("register-form")).toBeInTheDocument();
  //   });
  // });

  it("logs an error message on registration failure", async () => {
    axios.post.mockRejectedValue({ response: { status: 500 } });

    await act(async () => {
      render(
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("namaLengkap"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByTestId("notelp"), {
        target: { value: "123456789" },
      });
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "securepassword" },
      });

      fireEvent.click(screen.getByTestId("button-register"));
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error:", expect.anything());
    });
  });

  it("renders the form and registers user on form submission", async () => {
    axios.post.mockResolvedValue({ status: 200 });

    await act(async () => {
      render(
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("namaLengkap"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByTestId("notelp"), {
        target: { value: "123456789" },
      });
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "securepassword" },
      });

      fireEvent.click(screen.getByTestId("button-register"));
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${SERVER_URL}/auth/register`,
      JSON.stringify({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123456789",
        password: "securepassword",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/Verifikasi", {
        state: {
          formData: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123456789",
            password: "securepassword",
          },
        },
      });
    });
  });

  it("navigates to /Login on button click", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("buttonLogin"));
    });

    expect(mockNavigate).toHaveBeenCalledWith("/Login");
  });
});

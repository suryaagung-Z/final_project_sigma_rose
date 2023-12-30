import ButtonReset from "../Button/ButtonReset";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import TitleReset from "../InputPassword/TitleReset";
import AllertReset from "../Allert/AllertReset";
import axios from "axios";
import { SERVER_URL } from "../../lib/constants";

const VerifikasiOtp = () => {
  const otpOne = useRef(null);
  const otpTwo = useRef(null);
  const otpThree = useRef(null);
  const otpFor = useRef(null);
  const otpFive = useRef(null);
  const otpNine = useRef(null);
  const secon = useRef(null);
  const [sendRepeat, setSendRepeat] = useState("block");
  const [sendSeconds, setSendSeconds] = useState("hidden");
  const [warningRed, setWarningRed] = useState("hidden");
  const [successGreen, setSuccessGreen] = useState("hidden");
  const navigate = useNavigate();
  const location = useLocation();
  const emailUser = localStorage.getItem('email')

  useEffect(() => {


    const handleInput = (ref, nextRef) => {
      if (ref.current.value.length >= 1) {
        nextRef.current.focus();
      }
    };
    const removeValue = (ref, prevRef) => {
      if (ref.current.value.length === 0) {
        prevRef.current.focus();
      }
    };

    otpOne.current?.addEventListener("input", () =>
      handleInput(otpOne, otpTwo)
    );
    otpTwo.current?.addEventListener("input", () =>
      handleInput(otpTwo, otpThree)
    );
    otpThree.current?.addEventListener("input", () =>
      handleInput(otpThree, otpFor)
    );
    otpFor.current?.addEventListener("input", () =>
      handleInput(otpFor, otpFive)
    );
    otpFive.current?.addEventListener("input", () =>
      handleInput(otpFive, otpNine)
    );

    otpNine.current?.addEventListener("input", () =>
      removeValue(otpNine, otpFive)
    );
    otpFive.current?.addEventListener("input", () =>
      removeValue(otpFive, otpFor)
    );
    otpFor.current?.addEventListener("input", () =>
      removeValue(otpFor, otpThree)
    );
    otpThree.current?.addEventListener("input", () =>
      removeValue(otpThree, otpTwo)
    );
    otpTwo.current?.addEventListener("input", () =>
      removeValue(otpTwo, otpOne)
    );
  });

  function limit(limValue) {
    if (limValue.current.value.length > 1) {
      limValue.current.value = limValue.current.value.slice(0, 1);
    }
    return limValue;
  }
  otpOne.current?.addEventListener("input", () => limit(otpOne));
  otpTwo.current?.addEventListener("input", () => limit(otpTwo));
  otpThree.current?.addEventListener("input", () => limit(otpThree));
  otpFor.current?.addEventListener("input", () => limit(otpFor));
  otpFive.current?.addEventListener("input", () => limit(otpFive));
  otpNine.current?.addEventListener("input", () => limit(otpNine));

  const send = () => {
    const downCo = (coun) => {
      let varCoun = setInterval(function () {
        coun--;
        secon.current.innerText = coun;
        if (coun <= 0) {
          clearInterval(varCoun);
          setSendSeconds("hidden");
          setSendRepeat("block");
        }
      }, 1000);
    };
    downCo(61);
    setSendRepeat("hidden");
    setSendSeconds("block");
  };

  const { name, email, phone, password } = location.state || {};

  if (name && email && phone && password) {
    // eslint-disable-next-line no-unused-vars
    const user = { name, email, phone, password, verified: true };
  }

  const cl = async () => {
    if (
      otpOne.current.value.length != 0 &&
      otpTwo.current.value.length != 0 &&
      otpThree.current.value.length != 0 &&
      otpFor.current.value.length != 0 &&
      otpFive.current.value.length != 0 &&
      otpNine.current.value.length != 0
    ) {
      const otp =
        otpOne.current?.value +
        otpTwo.current?.value +
        otpThree.current?.value +
        otpFor.current?.value +
        otpFive.current?.value +
        otpNine.current?.value;

      await axios.post(
        `${SERVER_URL}/auth/register/otp`,
        JSON.stringify({
          ...location.state.formData,
          otp,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setSuccessGreen("block");
      setWarningRed("hidden");

      setTimeout(navigate('/login'), 5000);

    } else {
      navigate("/Register");
      setWarningRed("block");
      setSuccessGreen("hidden");
    }
  };

  return (
    <section className="">
      <TitleReset titleMessage={"Masukan OTP"} />
      <div className="pt-8 ml-4">
        <p className="text-MINI">
          ketik 6 digit kode yang dikirimkan ke <b>{emailUser}</b>
        </p>
      </div>
      <div className="ml-10 mt-6">
        <input
          type="text"
          className="w-12 h-12 border-2 border-DARKBLUE05 outline-none rounded-md mr-2 pr-2 pl-2 pb-1 pt-1 text-xs"
          ref={otpOne}
          maxLength="1"
        />
        <input
          type="text"
          className="w-12 h-12 border-2 border-DARKBLUE05 outline-none rounded-md mr-2 pl-1.5 pr-1.5 pb-1 pt-1 text-xs"
          ref={otpTwo}
          maxLength="1"
        />
        <input
          type="text"
          className="w-12 h-12 border-2 border-DARKBLUE05 outline-none rounded-md mr-2 pl-1.5 pr-1.5 pb-1 pt-1 text-xs"
          ref={otpThree}
          maxLength="1"
        />
        <input
          type="text"
          className="w-12 h-12 border-2 border-DARKBLUE05 outline-none rounded-md mr-2 pl-1.5 pr-1.5 pb-1 pt-1 text-xs"
          ref={otpFor}
          maxLength="1"
        />
        <input
          type="text"
          className="w-12 h-12 border-2 border-DARKBLUE05 outline-none rounded-md mr-2 pl-1.5 pr-1.5 pb-1 pt-1 text-xs"
          ref={otpFive}
          maxLength="1"
        />
        <input
          type="text"
          className="w-12 h-12 border-2 border-DARKBLUE05 outline-none rounded-md pl-1.5 pr-1.5 pb-1 pt-1 text-xs"
          ref={otpNine}
          maxLength="1"
        />
      </div>
      <div className="text-xs mt-7 ml-32">
        <strong className={`${sendRepeat} text-WARNING ml-12 `} onClick={send}>
          kirim ulang
        </strong>
        <p className={`${sendSeconds} ml-12`}>
          kirim ulang OTP dalam <strong ref={secon}></strong> detik
        </p>
      </div>
      <div className="mt-7">
        <ButtonReset title={"Simpan"} onClick={cl}></ButtonReset>
      </div>
      <div className={`${warningRed} ml-12 mt-20 `}>
        <AllertReset type="warning" message={"maaf kode OTP salah"} />
      </div>
      <div className={`${successGreen} ml-10 mt-20 `}>
        <AllertReset type="success" message={"Pendaftaran aKun berhasil"} />
      </div>
    </section>
  );
};

export default VerifikasiOtp;

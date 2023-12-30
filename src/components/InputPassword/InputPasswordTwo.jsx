import React from "react";
import ButtonReset from "../Button/ButtonReset";
import AllertReset from "../Allert/AllertReset";
import { useState, useEffect } from "react";
import { consumeUserApi } from "../../api/user";

const InputTwo = () => {
  const [failPass, setFailPass] = useState(false);
  const [failPassV, setFailPassV] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertAction, setAlertAction] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    setAlertTime();
  });

  const setAlertTime = () => {
    if (alertAction) {
      setTimeout(() => {
        setAlertAction(false);
      }, 5000);
    }
  };

  const butt = async () => {
    const fieldPass = document.getElementById("fieldPass").value;
    const fieldPassValidation = document.getElementById(
      "fieldPassValidation"
    ).value;

    const currentURL = window.location.href.toString();
    const urlParts = currentURL.split("/");
    const initToken = urlParts.indexOf("resetpassword") + 1;
    const token = urlParts[initToken];

    if (fieldPass != "" && fieldPassValidation != "") {
      if (fieldPass === fieldPassValidation) {
        consumeUserApi
          .resetPasswordValidation({ password: fieldPassValidation }, token)
          .then((res) => {
            if (res.status == "OK") {
              window.location.href = "https://craftiq.up.railway.app/login";
            } else {
              setAlertAction(true);
              setAlertStatus(false);
              setAlertMsg(res.message);
            }
          });
      } else {
        setFailPass(true);
        setFailPassV(true);
        setAlertAction(true);
        setAlertStatus(false);
        setAlertMsg("Password Harus sama");
      }
    } else {
      setFailPass(true);
      setFailPassV(true);
      setAlertAction(true);
      setAlertStatus(false);
      setAlertMsg("Tolong Diisi Semua");
    }
  };
  return (
    <div>
      <div className="relative">
        <label className="text-xs font-normal pb-1.5">
          Masukan Password Baru
        </label>
        <div className="relative">
          <input
            id="fieldPass"
            type="password"
            className={`${
              failPass
                ? "border-2 border-WARNING "
                : "border-2 border-neutral-200"
            } text-sm rounded-2xl px-4 py-3 w-full`}
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="text-xs font-normal pb-1.5">
          Ulangi Password Baru
        </label>
        <div className="relative">
          <input
            id="fieldPassValidation"
            type="password"
            className={` ${
              failPassV
                ? "border-2 border-WARNING "
                : "border-2 border-neutral-200"
            } text-sm rounded-2xl px-4 py-3 w-full `}
            required
          />
        </div>
        <div className="mt-8">
          <ButtonReset
            title={"Simpan"}
            onClick={butt}
            idtest="reset"
          ></ButtonReset>
        </div>
        <div className={` ml-LEFT mt-8 `}>
          {alertAction ? (
            <div className="relative mt-[40px] ">
              <AllertReset
                message={alertMsg}
                type={alertStatus ? "success" : "warning"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default InputTwo;

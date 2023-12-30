// import { useNavigate } from "react-router-dom";
import React from "react";
import InputTwo from "../InputPassword/InputPasswordTwo";
import TitleReset from "../InputPassword/TitleReset";
const ResetPassword = () => {
  return (
    <section data-testid="reset-password-component">
      <div className="">
        <TitleReset titleMessage={"Reset Password"} />
        <InputTwo />
      </div>
    </section>
  );
};
export default ResetPassword;

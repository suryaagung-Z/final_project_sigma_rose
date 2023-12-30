import React from "react";

/* eslint-disable react/prop-types */
const Button = ({ title, onClick, idtest = "" }) => {
  return (
    <div
      className="py-3 px-6 bg-DARKBLUE05 text-white text-center rounded-2xl mt-2 text-sm cursor-pointer"
      onClick={onClick}
      // data-testid="buttonRegister"
      data-testid={`button-${idtest}`}
    >
      {title}
    </div>
  );
};

export default Button;

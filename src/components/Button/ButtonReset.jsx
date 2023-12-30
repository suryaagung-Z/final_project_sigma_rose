import React from "react";
const ButtonReset = ({ title, onClick, idtest = "" }) => {
  return (
    <div
      className="py-3 px-6 bg-DARKBLUE05 text-white text-center rounded-2xl mt-2 text-sm"
      onClick={onClick}
      data-testid={`button-${idtest}`}
    >
      {title}
    </div>
  );
};
export default ButtonReset;

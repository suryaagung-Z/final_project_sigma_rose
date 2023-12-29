import React from "react";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const AllertReset = ({ message, type }) => {
  let bgColor = "";
  if (type === "warning") {
    bgColor = "bg-WARNING";
  } else if (type === "success") {
    bgColor = "bg-SUCCESS";
  }
  return (
    <div
      className={`${bgColor} text-white max-w-fit px-4 py-2 rounded-lg text-xs`}
      data-testid="alertreset"
    >
      {message}
    </div>
  );
};
export default AllertReset;

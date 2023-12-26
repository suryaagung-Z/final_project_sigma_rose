/* eslint-disable react/prop-types */
const ButtonReset = ({ title, onClick }) => {
  return (
    <div
      className="py-3 px-6 bg-DARKBLUE05 text-white text-center rounded-2xl mt-2 text-sm"
      onClick={onClick}
    >
      {title}
    </div>
  );
};
export default ButtonReset;

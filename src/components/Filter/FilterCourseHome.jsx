import React from 'react';

const FilterCourseHome = ({ title, activeButton, setActiveButton }) => {
  const isActive = title === activeButton;
  const color = isActive ? 'bg-DARKBLUE05 text-white' : 'bg-LIGHTBLUE text-black';

  const handleClick = () => {
    if (!isActive) {
      setActiveButton(title);
    } else {
      setActiveButton(null); // Deselect the active button if clicked again
    }
  };

  return (
    <button
      className={`${color} py-1 px-2 w-44 rounded-2xl hover:bg-DARKBLUE05 hover:text-white`}
      onClick={handleClick}
    >
      <p className={`text-xs ${isActive ? 'text-white' : 'text-black'}`}>{title}</p>
    </button>
  );
};

export default FilterCourseHome;

import { Icon } from '@iconify/react';

// eslint-disable-next-line react/prop-types
const NavbarButton = ({ isActive, onClick, icon, text }) => {
  return (
    <button onClick={onClick} className={`items-center justify-center ${isActive ? 'active' : 'inactive'}`}>
      {isActive ? (
        <div className="lg:bg-DARKBLUE03 flex items-center justify-center gap-2 lg:py-1 lg:px-5 lg:rounded-lg">
          <Icon icon={icon} className="text-black lg:text-white w-6 h-6" />
          <p className="text-black lg:text-white font-medium">{text}</p>
        </div>
      ) : (
        <div className='flex gap-2 lg:inline lg:gap:0 justify-center items-center'>
          <Icon icon={icon} className="text-black lg:text-white w-6 h-6" />
          <p className="text-black font-medium lg:hidden">{text}</p>
        </div>
      )}
    </button>
  );
};

export default NavbarButton;

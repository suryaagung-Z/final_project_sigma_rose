import { Icon } from '@iconify/react';

// eslint-disable-next-line react/prop-types
const ProgressBar = ({width, complete}) => {
    const progress = {
        width: width || 'auto',
      };

    return (
        <div className='flex gap-1'>
            <Icon icon="mdi:progress-check" className="text-SUCCESS text-lg" />
            <div className='w-48 bg-DARKGREY rounded-full relative'>
                <div
                className='w-28 bg-DARKBLUE05 rounded-full absolute'
                style={{ ...progress, height: "100%" }}
                ></div>
                <p className='text-xs text-white text-left px-1 mt-0.5 relative'>
                {complete}
                </p>
            </div>
        </div>
    )

}

export default ProgressBar
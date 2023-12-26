import { Icon } from '@iconify/react';


// eslint-disable-next-line react/prop-types
const Card = ({picture, course, rating, topic, author, level, module, time, price ,onClick}) => {

    price == null ? price = null: price ;

    return (
        <button onClick={onClick} className="bg-white w-[323px] h-[250px] rounded-2xl flex flex-col" style={{ boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.08)' }}>
            <div className='h-[80px] rounded-t-[20px] overflow-hidden'>
                <img src={picture} className="w-[323px] h-full object-cover" alt="" />
            </div>
            <div className="w-[320px] px-3 py-3">
                <div className="flex justify-between">
                    <p className="text-xs font-semibold text-DARKBLUE05">{course}</p>
                    <div className="flex gap-1">
                        <Icon icon="bi:star-fill" className="text-ATTENTION text-sm"/>
                        <p className="text-xs font-semibold">{rating}</p>
                    </div>
                </div>
                <p className="text-sm font-semibold mt-1 text-left">{topic}</p>
                <p className="text-xs mt-1 text-left">by {author}</p>
                <div className="flex justify-between mt-1">
                    <div className="flex gap-1 items-center">
                        <Icon icon="mdi:badge-outline" className="mt-1 text-SUCCESS text-lg" />
                        <p className="text-xs text-DARKBLUE05 font-medium mt-1">{level}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Icon icon="clarity:book-line" className="mt-1 text-SUCCESS text-lg" />
                        <p className="text-xs font-medium mt-1">{module}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Icon icon="ri:time-fill" className="mt-1 text-SUCCESS text-lg" />
                        <p className="text-xs font-medium mt-1">{time}</p>
                    </div>
                </div>
            {
                price != null ? 
                <div className="bg-DARKBLUE03 text-white flex justify-between px-4 py-1 mt-3" style={{borderRadius: '15px', width: '180px'}}>
                    <div className="flex gap-1">
                        <Icon icon="fluent:premium-12-filled" className="text-lg" />
                        <p className="text-sm font-medium">Beli</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">{price}</p>
                    </div>
                </div> : <></>
            }
            </div>
        </button>
    )
}

export default Card
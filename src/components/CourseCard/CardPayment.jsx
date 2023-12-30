// eslint-disable-next-line react/prop-types
const Card = ({picture, course, topic, author}) => {
    return (
        <div className="bg-white w-full lg:w-[323px] h-full rounded-2xl" style={{boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.08)'}}>
            <div className='h-[80px] rounded-t-[20px] overflow-hidden'>
                <img src={picture} className="w-full lg:w-[323px] h-full object-cover" alt="" />
            </div>
            <div className="w-full lg:w-[320px] px-3 py-3">
                <div className="">
                    <p className="text-xs text-left font-semibold text-DARKBLUE05">{course}</p>
                </div>
                <p className="text-sm font-semibold mt-1 text-left">{topic}</p>
                <p className="text-xs mt-1 text-left">by {author}</p>
            </div>
        </div>
    )
}

export default Card
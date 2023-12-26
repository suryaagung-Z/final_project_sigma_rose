// eslint-disable-next-line react/prop-types
const Frame = ({picture, title}) => {
    return (
        <button className="flex flex-col items-center justify-center w-40 h-[136px]">
            <div className="w-[140px] h-[100px]">
                <img src={picture} className="w-full h-full object-cover rounded-3xl" />
            </div>
            <p className="font-medium text-sm mt-2">{title}</p>
        </button>
    )
}

export default Frame
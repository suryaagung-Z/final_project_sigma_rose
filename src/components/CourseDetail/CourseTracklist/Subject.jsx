// eslint-disable-next-line react/prop-types
const Subject = ({number, subject}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="flex bg-LIGHTBLUE w-9 h-9 items-center justify-center rounded-full font-medium text-sm">{number}</div>
            <p className="text-sm">{subject}</p>
        </div>
    )
}

export default Subject
// eslint-disable-next-line react/prop-types
const FilterPlanProgress = ({title , color }) => {

    color == null ? color = 'bg-white text-DARKBLUE06' : color ;
    
    return (
        <div>
            <button className={`${color} rounded-full md:rounded-xl w-full px-4 md:px-0 md:w-56 h-8 md:h-10 font-bold hover:bg-DARKBLUE05 hover:text-white active:bg-DARKBLUE05 active:text-white`}>
                {title}
            </button>
        </div>
    )
}

export default FilterPlanProgress
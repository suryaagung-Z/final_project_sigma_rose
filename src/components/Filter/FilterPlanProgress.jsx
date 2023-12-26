// eslint-disable-next-line react/prop-types
const FilterPlanProgress = ({title , color }) => {

    color == null ? color = 'bg-white text-DARKBLUE06' : color ;
    
    return (
        <div>
            <button className={`${color} rounded-xl w-56 h-10 font-bold hover:bg-DARKBLUE05 hover:text-white active:bg-DARKBLUE05 active:text-white  `}>{title}</button>
        </div>
    )
}

export default FilterPlanProgress
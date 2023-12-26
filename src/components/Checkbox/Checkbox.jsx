import { useState } from "react";
import { Icon } from '@iconify/react';

// eslint-disable-next-line react/prop-types
const Checkbox = ({title , id , value}) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <label className="flex gap-8 items-center mb-4">
            <div className="relative flex items-center">
                <input id = {id}
                value = {value}
                type="checkbox"
                className="appearance-none bg-LIGHTBLUE h-6 w-6 rounded-lg border-2 border-DARKGREY checked:bg-DARKBLUE05 checked:border-none absolute"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                style={{ cursor: 'pointer' }}
                />
                {isChecked && (
                <Icon
                    icon="tabler:check"
                    color="white"
                    className="absolute text-lg ml-0.5"
                />
                )}
            </div>
            <span className={`font-medium text-sm ${isChecked ? 'text-dark' : 'text-DARKBLUE06'}`}>{title}</span>
        </label>
    )
}

export default Checkbox
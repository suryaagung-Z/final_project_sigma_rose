import { Icon } from '@iconify/react';
import AnimatedButton from '../Button/AnimatedButton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

// eslint-disable-next-line react/prop-types
const CourseTitle = ({course, rating, topic, author, level, module, time , tele }) => {
    return (
        <div className=" py-3 w-[600px]">
            <div className="flex justify-between">
                <p className="text-lg font-semibold text-DARKBLUE05">{course ?? <Skeleton width={'200px'}/>}</p>
                <div className="flex gap-1">
                    <Icon icon="bi:star-fill" className="text-ATTENTION mt-0.5"/>
                    <p className="font-semibold">{rating ?? <Skeleton width={'70px'}/>}</p>
                </div>
            </div>
            <p className="text-lg font-semibold text-left">{topic ?? <Skeleton/>}</p>
            <p className="text-sm mt-1 text-left">{author ?? <Skeleton/>}</p>
            <div className="flex justify-between mt-1 w-80">
                <div className="flex gap-1 items-center">
                    <Icon icon="mdi:badge-outline" className="mt-1 text-SUCCESS text-lg" />
                    <p className="text-sm text-DARKBLUE05 font-medium mt-1">{level ?? <Skeleton width={'100px'}/>}</p>
                </div>
                <div className="flex gap-1 items-center">
                    <Icon icon="clarity:book-line" className="mt-1 text-SUCCESS text-lg" />
                    <p className="text-sm font-medium mt-1">{module ?? <Skeleton/>}</p>
                </div>
                <div className="flex gap-1 items-center">
                    <Icon icon="ri:time-fill" className="mt-1 text-SUCCESS text-lg" />
                    <p className="text-sm font-medium mt-1">{time ?? <Skeleton/>}</p>
                </div>
            </div>
            <AnimatedButton>
                <a href={tele}>
                    <div className="bg-SUCCESS text-white flex justify-center items-center px-4 py-1 mt-3 rounded-full w-52">
                        <div className="flex gap-2">
                            <p className="text-sm font-medium">Join Grup Telegram</p>
                            <Icon icon="gridicons:chat" className="text-xl" />
                        </div>
                    </div>  
                </a>
            </AnimatedButton>
        </div>
    )
}

export default CourseTitle
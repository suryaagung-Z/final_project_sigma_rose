import { Icon } from '@iconify/react';
import ProgressCard from "../components/CourseCard/ProgressCard";
import Footer from "../components/Footer/Footer"
import FilterPlanProgress from "../components/Filter/FilterPlanProgress";
import { updateId } from '../store/moduleCourses';
import { useNavigate } from "react-router-dom"
import SidebarFilter from "../components/Filter/SidebarFilter";
import { useEffect, useState } from "react";
import { consumeCourseTrackingsApi } from '../api/courseTrackings';
import { consumeUserApi } from "../api/user";
import { useDispatch } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const CourseTracking = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [courseTrack, setCourseTrack] = useState([]);
    const [currentCourseTrack, setCurrentCourseTrack] = useState([])
    const [user, setUser] = useState([])
    const [filterColor1, setFilterColor1] = useState('bg-DARKBLUE05 text-white')
    const [filterColor2, setFilterColor2] = useState(null)
    const [filterColor3, setFilterColor3] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUserAPI();
        getCourseByOrder();
        sideFilterFunction();
    })



const getCurrentUserAPI = () => {
    consumeUserApi.getCurrentUser().then(res => {
        setUser(res.data)
    })
}

const getCourseByOrder = () => {
    if (currentCourseTrack.length <= 0) {
        consumeCourseTrackingsApi.getCourseTrackings().then((res) => {
            setIsLoading(true)
            if (res.status == 'OK') {
                setCourseTrack(res.data)
                setCurrentCourseTrack(res.data)
                setIsLoading(false)
            }
        })
    } else {
        return currentCourseTrack;
    }
}

const sideFilterFunction = () => {

    const filterList = [];
    const delFilter = document.getElementById('deleteFilter');
    const checkList = ['uiux', 'webdev', 'android', 'datasc', 'semua', 'beginner', 'intermediate', 'advanced'];
    const fieldClass = document.getElementById('fieldClass');
    const searchClassButton = document.getElementById('searchClassButton');

    checkList.map((data) => {
        const checkBoxValue = document.getElementById(data).value;

        if (document.getElementById(data).checked) {
            if (filterList.indexOf(checkBoxValue) <= -1) {
                filterList.push(checkBoxValue)
            }
        }

        document.getElementById(data).onclick = () => {
            if (document.getElementById(data).checked) {
                if (filterList.indexOf(checkBoxValue) <= -1) {
                    filterList.push(checkBoxValue)
                }
            } else {
                if (filterList.indexOf(checkBoxValue) >= -1) {
                    filterList.splice(filterList.indexOf(data), 1)
                }
            }
        }
    })

    delFilter.onclick = () => {
        checkList.map((data) => {
            if (document.getElementById(data).checked) {
                document.getElementById(data).addEventListener('click', function () {
                })
                document.getElementById(data).click();
            }
            filterList.length = 0
            setCourseTrack(currentCourseTrack)
        })
    }

    searchClassButton.onclick = () => {

        if (fieldClass.value != '') {
            filterList.push(fieldClass.value)
        }

        const filteredDone = currentCourseTrack.filter((data) => {
            const initiateData = `${data.course.category.title + ' ' + data.course.level.toLowerCase() + ' ' + data.course.title + ' ' + data.course.description}`
            const filterChecked = filterList.map((value) => {
                return initiateData.includes(value);
            })

        
            if (filterChecked.includes(true)) {
                return data;
            }

            if (fieldClass.value == '' & filterList.length == 0) {
                return data;
            }

            if (initiateData == '') {
                return data;
            }
        })

        setCourseTrack(filteredDone)
    }

}

const filterTypeFunction = (TYPE) => {
    if (TYPE == 'PROGRESS') {
        const progressData = currentCourseTrack.filter((data) => {
            return data.status == 'PROGRESS';
        })
        setFilterColor1(null)
        setFilterColor2('bg-DARKBLUE05 text-white')
        setFilterColor3(null)
        setCourseTrack(progressData)
    } else if (TYPE == 'DONE') {
        const doneData = currentCourseTrack.filter((data) => {
            return data.status == 'DONE';
        })
        setFilterColor1(null)
        setFilterColor2(null)
        setFilterColor3('bg-DARKBLUE05 text-white')
        setCourseTrack(doneData)
    } else {
        setFilterColor1('bg-DARKBLUE05 text-white')
        setFilterColor2(null)
        setFilterColor3(null)
        setCourseTrack(currentCourseTrack);
    }
}

return (
    <section className="">
        <div className="w-full bg-LIGHTBLUE">
            <div className="grid place-content-center">
                <div className="w-[1024px] pt-10">
                    <div className="flex justify-between items-center mb-16">
                        <h1 className="text-2xl font-bold">Kelas Berjalan</h1>
                        <div className="flex gap-16 bg-white border-2 border-DARKBLUE05 rounded-full px-6 py-3">
                            <input id='fieldClass' type="text" className="w-32 outline-none border-none" placeholder="Cari Kelas" />
                            <button id='searchClassButton' className="bg-DARKBLUE05 flex items-center justify-center w-9 h-9 rounded-xl">
                                <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid place-content-center">
                <div className="w-[1024px] pb-20">
                    <div className="flex gap-20">
                        <SidebarFilter />

                        <div className="w-3/4">
                            <div className="mb-10 flex justify-between">
                                <div onClick={() => {
                                    filterTypeFunction('')
                                }}><FilterPlanProgress title={"All"} color={filterColor1} /></div>

                                <div onClick={() => {

                                    filterTypeFunction('PROGRESS')
                                }}>
                                    <FilterPlanProgress title={"In Progress"} color={filterColor2} />
                                </div>

                                <div onClick={() => {
                                    filterTypeFunction('DONE')

                                }}>
                                    <FilterPlanProgress title={"Complete"} color={filterColor3} />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-14 gap-y-10">
                                {
                                    isLoading ?
                                    <SkeletonTheme baseColor="#dcdee0" >
                                        <div className='flex flex-wrap gap-x-14 gap-y-10'>
                                            <div >
                                                <Skeleton height={'100px'} width={'323px'}/>
                                                <Skeleton count={3} />
                                            </div>
                                            <div >
                                                <Skeleton height={'100px'} width={'323px'}/>
                                                <Skeleton count={3} />
                                            </div>
                                            <div >
                                                <Skeleton height={'100px'} width={'323px'}/>
                                                <Skeleton count={3} />
                                            </div>
                                            <div >
                                                <Skeleton height={'100px'} width={'323px'}/>
                                                <Skeleton count={3} />
                                            </div>
                                        </div>
                                    </SkeletonTheme>
                                    :
                                    courseTrack.map((data) => {

                                        const totalModule = data.course.module.length
                                        var moduleTrack = []
                                        const filteredData = data.course.module.filter(data => {
                                            if (data.moduleTracking.length > 0) {
                                                return data.moduleTracking.filter(item => {
                                                    if (item.userId == user.id) {
                                                        return item;
                                                    }
                                                })

                                            }
                                        })

                                        moduleTrack = filteredData

                                        let indicator = 0;
                                        const doneValue = 100 / totalModule;
                                        const progressValue = 100 / totalModule / 2;

                                        for (let i = 0; i < moduleTrack.length; i++) {
                                            if (moduleTrack[i].moduleTracking[0].status == 'PROGRESS') {
                                                indicator += progressValue;
                                            } else if (moduleTrack[i].moduleTracking[0].status == 'DONE') {
                                                indicator += doneValue;

                                            }
                                        }

                                        return (

                                            <button key={data.id} onClick={() => {
                                                navigate("/courses/detail/unlock")
                                                dispatch(updateId(data.course.id))
                                            }}>
                                                <ProgressCard picture={data.course.image}
                                                    course={data.course.category.title}
                                                    rating={data.course.rating}
                                                    topic={data.course.title}
                                                    author={data.course.authorBy}
                                                    level={data.course.level}
                                                    module={`${data.course.module.length} Module`}
                                                    time={
                                                        `${data.course.module.reduce((accumulator, currentValue) => {
                                                            return accumulator + currentValue.time;
                                                        }, 0) / 60} Menit`
                                                    }
                                                    width={`${indicator}%`}
                                                    complete={`${indicator}% Complete`} />
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </section>
)
                            }

export default CourseTracking
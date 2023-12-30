import { Icon } from '@iconify/react';
import Footer from "../components/Footer/Footer"
import ProgressCard from "../components/CourseCard/ProgressCard";
import { updateId } from '../store/moduleCourses';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
} from "@material-tailwind/react";
import FilterPlanProgress from "../components/Filter/FilterPlanProgress";
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import AnimatedButton from '../components/Button/AnimatedButton';
import SidebarFilter from "../components/Filter/SidebarFilter";
import getCookieValue from "../api/getCookie";
import { consumeCourseTrackingsApi } from '../api/courseTrackings';
import { consumeUserApi } from "../api/user";
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
    const [openFilter, setOpenFilter] = useState(false);
    const token = getCookieValue("token")
    const sideFilterTrackRef = useRef()

    const handleOpen = () => setOpenFilter(!openFilter)

    useEffect(() => {
        getCurrentUserAPI();
        getCourseByOrder();
        sideFilterValidationDOM()
    })
    
    const handleLogin = () => {
        if (token === null) {
            navigate("/login")
        } else {
            setOpen(!open)
        }
    }

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
                    const courseTrackFilter = res.data.filter( data => {
                        return data.userId == user.id
                    }) 

                    setCourseTrack(courseTrackFilter)
                    setCurrentCourseTrack(courseTrackFilter)
                    setIsLoading(false)
                }
            })
        } else {
            return currentCourseTrack;
        }
    }


const sideFilterValidationDOM = () => {
    console.log()
    if(sideFilterTrackRef.current != null){
        sideFilterFunction()
    }
}

const sideFilterFunction = () => {

    const filterList = [];
    const delFilter = sideFilterTrackRef.current.querySelector('#deleteFilter');
    const checkList = ['uiux', 'pm', 'webdev', 'android', 'ios', 'datasc', 'network', 'ai', 'cloud', 'iot', 'gamedev', 'cyber', 'semua', 'beginner', 'intermediate', 'advanced'];
    const fieldClass = document.getElementById('fieldClass');
    const filterButton = sideFilterTrackRef.current.querySelector(`#filterButton`);

    checkList.map((data) => {
        const checkBoxValue = sideFilterTrackRef.current.querySelector(`#${data}`).value;

        if (sideFilterTrackRef.current.querySelector(`#${data}`).checked) {
            if (filterList.indexOf(checkBoxValue) <= -1) {
                filterList.push(checkBoxValue)
            }
        }

        sideFilterTrackRef.current.querySelector(`#${data}`).onclick = () => {
            if (sideFilterTrackRef.current.querySelector(`#${data}`).checked) {
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
            if (sideFilterTrackRef.current.querySelector(`#${data}`).checked) {
                sideFilterTrackRef.current.querySelector(`#${data}`).addEventListener('click', function () {
                })
                sideFilterTrackRef.current.querySelector(`#${data}`).click();
            }
            filterList.length = 0
            setCourseTrack(currentCourseTrack)
        })
    }

    filterButton.onclick = () => {
        if (fieldClass.value != '') {
            filterList.push(fieldClass.value)
        }

        const filteredDone = currentCourseTrack.filter((data) => {
            const initiateData = `${data.course.category.title + ' ' + data.course.level.toLowerCase() + ' ' + data.title + ' ' + data.description}`
            const filterChecked = filterList.map((value) => {
                return initiateData.includes(value);
            })

            if (filterChecked.includes(true)) {
                return data;
            }
        })

        setCourseTrack(filteredDone)
    }
}

const searchCourse = (event) => {
    event.target.value;
    const fieldClass = document.getElementById('fieldClass').value

    const courseFiltered = currentCourseTrack.filter(( data) => {
        return `${data.course.title + '' + data.course.category.title}`.toLowerCase().indexOf(fieldClass.toLowerCase()) > -1;
    })

    setCourseTrack(courseFiltered)
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
            <div className="lg:grid lg:place-content-center px-10 lg:px-0">
                <div className="w-full lg:w-[1024px] pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-16">
                        <h1 className="text-2xl font-bold mb-8 md:mb-0">Kelas Berjalan</h1>
                        <div className='flex items-center gap-5 lg:gap-0'>
                            <div className='flex gap-8 lg:gap-0 justify-center items-center'>
                                <div className="flex gap-14 md:gap-16 bg-white border-2 border-DARKBLUE05 rounded-full px-6 py-3">
                                    <input id='fieldClass' onChange={(event)=> {searchCourse(event)}} type="text" className="w-32 outline-none border-none" placeholder="Cari Kelas" />
                                    <button className="bg-DARKBLUE05 flex items-center justify-center w-9 h-9 rounded-xl">
                                        <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => {handleOpen()}}>
                                <Icon icon="mi:filter" className='lg:hidden text-DARKBLUE05 text-4xl'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:grid lg:place-content-center px-4 lg:px-0">
                <div className="w-full lg:w-[1024px] pb-20">
                    <div  className="flex gap-20">
                        <div ref={sideFilterTrackRef} className='w-full lg:w-1/4 hidden lg:inline'>
                            <SidebarFilter />
                        </div>

                        <div className="w-full lg:w-3/4">
                            <div className="mb-10 flex gap-4 justify-center items-center">
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
                            <div className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center lg:justify-normal lg:items-start">
                                {
                                    isLoading ?
                                    <SkeletonTheme baseColor="#dcdee0" >
                                        <div className='flex flex-wrap gap-x-14 gap-y-10 justify-center items-center'>
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
                                                <AnimatedButton>
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
                                                </AnimatedButton>
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
        <Dialog  open={openFilter} handler={handleOpen}>
                <div className="flex justify-end">
                    <button className="px-2 py-2" onClick={handleOpen}>
                        <Icon icon="material-symbols:close" className="text-3xl" />
                    </button>
                </div>
                <DialogBody  ref={sideFilterTrackRef} className="grid place-items-center text-black">
                    <div className='h-[480px] overflow-y-scroll scrollbar scrollbar-thumb-gray-100 scrollbar-w-2 scrollbar-thumb-rounded-2xl mb-10'>
                        <SidebarFilter/>
                    </div>
                </DialogBody>
        </Dialog>
        
    </section>
    )
}

export default CourseTracking
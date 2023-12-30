import { Icon } from '@iconify/react';
// import Checkbox from "../components/Checkbox/Checkbox";
import Footer from "../components/Footer/Footer"
import Card from "../components/CourseCard/Card"
import { updateId } from '../store/moduleCourses';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
} from "@material-tailwind/react";
import FilterPlanProgress from "../components/Filter/FilterPlanProgress";
import { useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom"
import { resetId } from '../store/moduleCourses';
import { useEffect, useRef, useState } from "react";
import { getCourses } from "../api/servicesApi";
import { useDispatch } from 'react-redux';
import { formatRupiah } from '../lib/rupiahFormat';
import FreeCard from '../components/CourseCard/FreeCard';
import AnimatedButton from '../components/Button/AnimatedButton';
import SidebarFilter from '../components/Filter/SidebarFilter';
import getCookieValue from "../api/getCookie";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Courses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState([])
    const [course, setCourse] = useState([])
    const [courseSelection, setCourseSelection] = useState({})
    const [filterColor1, setFilterColor1] = useState('bg-DARKBLUE05 text-white')
    const [filterColor2, setFilterColor2] = useState(null)
    const [filterColor3, setFilterColor3] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [openFilter, setOpenFilter] = useState(false);
    const token = getCookieValue("token")
    const sideFilterRef = useRef()

    const handleOpen = () => setOpenFilter(!openFilter)

    useEffect(() => {
        getCoursesApi();
        sideFilterValidationDOM();
    })

    const handleResetId = () => {
        dispatch(resetId());
    };

    useEffect(() => {
        handleResetId();
    }, []);

    const handleLogin = () => {
        if (token === null) {
            navigate("/login")
        } else {
            setOpen(!open)
        }
    }

    const getCoursesApi = () => {
        if (currentCourse.length <= 0) {
            getCourses().then((res) => {
                setIsLoading(true)
                if (res.data.status == 'OK') {
                    const response = res.data.data;
                    setCourse(response);
                    setCurrentCourse(response)
                    setIsLoading(false)
                }
            })
        } else {
            return currentCourse;
        }
    }

    const sideFilterValidationDOM = () => {
        console.log()
        if(sideFilterRef.current != null){
            sideFilterFunction()
        }
    }

    const sideFilterFunction = () => {
        const filterList = [];
        const delFilter = sideFilterRef.current.querySelector('#deleteFilter');
        const checkList = ['uiux', 'pm', 'webdev', 'android', 'ios', 'datasc', 'network', 'ai', 'cloud', 'iot', 'gamedev', 'cyber', 'semua', 'beginner', 'intermediate', 'advanced'];
        const fieldClass = document.getElementById('fieldClass');
        const filterButton = sideFilterRef.current.querySelector(`#filterButton`);

        checkList.map((data) => {
            const checkBoxValue = sideFilterRef.current.querySelector(`#${data}`).value;

            if (sideFilterRef.current.querySelector(`#${data}`).checked) {
                if (filterList.indexOf(checkBoxValue) <= -1) {
                    filterList.push(checkBoxValue)
                }
            }

            sideFilterRef.current.querySelector(`#${data}`).onclick = () => {
                if (sideFilterRef.current.querySelector(`#${data}`).checked) {
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
                if (sideFilterRef.current.querySelector(`#${data}`).checked) {
                    sideFilterRef.current.querySelector(`#${data}`).addEventListener('click', function () {
                    })
                    sideFilterRef.current.querySelector(`#${data}`).click();
                }
                filterList.length = 0
                setCourse(currentCourse)
            })
        }

        filterButton.onclick = () => {
            if (fieldClass.value != '') {
                filterList.push(fieldClass.value)
            }

            const filteredDone = currentCourse.filter((data) => {
                const initiateData = `${data.category.title + ' ' + data.level.toLowerCase() + ' ' + data.title + ' ' + data.description}`
                const filterChecked = filterList.map((value) => {
                    return initiateData.includes(value);
                })

                if (filterChecked.includes(true)) {
                    return data;
                }
            })

            setCourse(filteredDone)
        }
    }


    

    const searchCourse = (event) => {
        event.target.value;
        const fieldClass = document.getElementById('fieldClass').value

        const courseFiltered = currentCourse.filter((data) => {
            return `${data.title + '' + data.category.title}`.toLowerCase().indexOf(fieldClass.toLowerCase()) > -1;
        })

        setCourse(courseFiltered)
    }

    const filterTypeFunction = (TYPE) => {
        if (TYPE == 'PREMIUM') {
            const premiumData = currentCourse.filter((data) => {
                return data.type == 'PREMIUM';
            })
            setFilterColor1(null)
            setFilterColor2('bg-DARKBLUE05 text-white')
            setFilterColor3(null)
            setCourse(premiumData)
        } else if (TYPE == 'FREE') {
            const freeData = currentCourse.filter((data) => {
                return data.type == 'FREE';
            })
            setFilterColor1(null)
            setFilterColor2(null)
            setFilterColor3('bg-DARKBLUE05 text-white')
            setCourse(freeData)
        } else {
            setFilterColor1('bg-DARKBLUE05 text-white')
            setFilterColor2(null)
            setFilterColor3(null)
            setCourse(currentCourse);
        }
    }

    return (
        <section>
            <div className="w-full bg-LIGHTBLUE">
                <div className="lg:grid lg:place-content-center px-10 lg:px-0">
                    <div className="w-full lg:w-[1024px] pt-10">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-16">
                            <h1 className="text-2xl font-bold mb-8 md:mb-0">Topik Kelas</h1>
                            <div className='flex items-center gap-5 lg:gap-0'>
                                <div className='flex gap-8 lg:gap-0 justify-center items-center'>
                                    <div className="flex gap-14 md:gap-16 bg-white border-2 border-DARKBLUE05 rounded-full px-6 py-3">
                                        <input id='fieldClass' onChange={(event) => { searchCourse(event) }} type="text" className="w-32 outline-none border-none" placeholder="Cari Kelas" />
                                        <button className="bg-DARKBLUE05 flex items-center justify-center w-9 h-9 rounded-xl">
                                            <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => { handleOpen() }}>
                                    <Icon icon="mi:filter" className='lg:hidden text-DARKBLUE05 text-4xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:grid lg:place-content-center px-4 lg:px-0">
                    <div className="w-full lg:w-[1024px] pb-20">
                        <div className="flex gap-20">
                            <div ref={sideFilterRef} className='w-full lg:w-1/4 hidden lg:inline'>
                                <SidebarFilter  />
                            </div>
                            <div className="w-full lg:w-3/4">
                                <div className="mb-10 flex gap-4 justify-center items-center">
                                    <div onClick={() => {
                                        filterTypeFunction('')
                                    }}><FilterPlanProgress title={"All"} color={filterColor1} /></div>

                                    <div onClick={() => {

                                        filterTypeFunction('PREMIUM')
                                    }}>
                                        <FilterPlanProgress title={"Premium"} color={filterColor2} />
                                    </div>

                                    <div onClick={() => {
                                        filterTypeFunction('FREE')

                                    }}>
                                        <FilterPlanProgress title={"Kelas Gratis"} color={filterColor3} />
                                    </div>
                                </div>
                                <div id='courseList' className="flex flex-wrap gap-x-14 gap-y-10 justify-center items-center lg:justify-normal lg:items-start">
                                    {

                                        isLoading ?
                                            <SkeletonTheme baseColor="#dcdee0" >
                                                <div className='flex flex-wrap gap-x-14 gap-y-10 justify-center items-center'>
                                                    <div >
                                                        <Skeleton height={'100px'} width={'323px'} />
                                                        <Skeleton count={3} />
                                                    </div>
                                                    <div >
                                                        <Skeleton height={'100px'} width={'323px'} />
                                                        <Skeleton count={3} />
                                                    </div>
                                                    <div >
                                                        <Skeleton height={'100px'} width={'323px'} />
                                                        <Skeleton count={3} />
                                                    </div>
                                                    <div >
                                                        <Skeleton height={'100px'} width={'323px'} />
                                                        <Skeleton count={3} />
                                                    </div>
                                                </div>
                                            </SkeletonTheme>
                                            :

                                            course.map((item) => {

                                                let count = 0
                                                for (let i = 0; i < item.module.length; i++) {
                                                    count = count + item.module[i].time
                                                }

                                                if (item.type == 'FREE') {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => {
                                                                navigate("/courses/detail")
                                                                dispatch(updateId(item.id))
                                                            }}>
                                                            <AnimatedButton>
                                                                <FreeCard
                                                                    picture={item.image}
                                                                    course={item.category.title}
                                                                    rating={item.rating}
                                                                    topic={item.title}
                                                                    author={item.authorBy}
                                                                    level={item.level}
                                                                    module={item.module.length + " Module"}
                                                                    time={count / 60 + " Menit"}
                                                                />
                                                            </AnimatedButton>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => {
                                                                handleLogin()
                                                                setCourseSelection(item)
                                                            }}>
                                                            <AnimatedButton>
                                                                <Card
                                                                    picture={item.image}
                                                                    course={item.category.title}
                                                                    rating={item.rating}
                                                                    topic={item.title}
                                                                    author={item.authorBy}
                                                                    level={item.level}
                                                                    module={item.module.length + " Module"}
                                                                    time={count / 60 + " Menit"}
                                                                    price={formatRupiah(item.price)} />
                                                            </AnimatedButton>
                                                        </div>
                                                    )
                                                }

                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <Dialog open={openFilter} handler={handleOpen}>
                <div className="flex justify-end">
                    <button className="px-2 py-2" onClick={handleOpen}>
                        <Icon icon="material-symbols:close" className="text-3xl" />
                    </button>
                </div>
                <DialogBody  ref={sideFilterRef}  className="grid place-items-center text-black">
                    <div className='h-[480px] overflow-y-scroll scrollbar scrollbar-thumb-gray-100 scrollbar-w-2 scrollbar-thumb-rounded-2xl mb-10'>
                        <SidebarFilter  />
                    </div>
                </DialogBody>
            </Dialog>

            <Dialog open={open} handler={() => setOpen(!open)}>
                <div className="flex justify-end">
                    <button className="px-2 py-2" onClick={() => setOpen(!open)}>
                        <Icon icon="material-symbols:close" className="text-3xl" />
                    </button>
                </div>
                <DialogHeader className="grid place-content-center">
                    <Typography variant="h3" className="text-center text-black">
                        Selangkah lagi menuju
                    </Typography>
                    <Typography variant="h3" className="text-center text-DARKBLUE05">
                        Kelas Premium
                    </Typography>
                </DialogHeader>
                <DialogBody className="grid place-items-center gap-4 text-black">
                    <Card
                        picture={courseSelection.category?.image}
                        course={courseSelection.category?.title}
                        rating={courseSelection.rating}
                        topic={courseSelection.title}
                        author={courseSelection.authorBy}
                        level={courseSelection.level}
                        module={courseSelection.module != null ? courseSelection.module.length : 10 + " Module"}
                        time={
                            courseSelection.module != null ? `${courseSelection.module.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue.time;
                            }, 0) / 60} Menit` : '26 Menit'
                        }
                        price={formatRupiah(courseSelection.price ?? 19999)} />
                    <AnimatedButton>
                        <button className="mt-6 w-80 mb-4" onClick={() => {
                            navigate("/payment")
                            dispatch(updateId(courseSelection.id))
                        }
                        }>
                            <div className="bg-DARKBLUE05 rounded-full py-3 flex justify-center items-center gap-2">
                                <p className="text-white font-bold">Beli Sekarang</p>
                                <Icon icon="carbon:next-filled" className="text-white text-2xl" />
                            </div>
                        </button>
                    </AnimatedButton>
                </DialogBody>
            </Dialog>
        </section>
    )
}

export default Courses
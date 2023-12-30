import { useEffect, useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
} from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import Footer from "../components/Footer/Footer";
import CourseTitle from "../components/CourseDetail/CourseTitle";
import ProgressBar from "../components/CourseDetail/CourseTracklist/ProgressBar";
import Subject from "../components/CourseDetail/CourseTracklist/Subject";
import { getCourses } from "../api/servicesApi";
import AnimatedButton from "../components/Button/AnimatedButton";
import ReactPlayer from 'react-player'
import illustration from "../assets/img/illustration2.png"
import { consumeModuleTrackingsApi } from "../api/moduleTracking";
import { consumeUserApi } from "../api/user";
import { consumeCourseTrackingsApi } from "../api/courseTrackings";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const CourseDetailUnlock = () => {
    const [course, setCourse] = useState([])
    const id = useSelector((state) => state.module.id)
    const [open, setOpen] = useState(false);
    const [totalModule, setTotalModule] = useState(0)
    const [moduleId, setModuleId] = useState('')
    const [totalTime, setTotalTime] = useState(0)
    const [totalTimeCh1, setTotalTimeCh1] = useState(0)
    const [totalTimeCh2, setTotalTimeCh2] = useState(0)
    const [moduleTrack, setModuleTrack] = useState([])
    const [indicatorPercent, setIndicatorPercent] = useState(0)
    const [chapter1, setChapter1] = useState([])
    const [chapter2, setChapter2] = useState([])
    const [listText1, setListText1] = useState('')
    const [listText2, setListText2] = useState('')
    const [listText3, setListText3] = useState('')
    const [moduleVideo, setModuleVideo] = useState('')
    const [user, setUser] = useState([])
    const [currentModuleVideo, setCurrentModuleVideo] = useState('')
    const [currentModule, setCurrentModule] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    const handleOpen = () => setOpen(false)

    useEffect(() => {
        getCourses()
            .then((res) => {
                setIsLoading(true)
                if(id != null){
                    setIsLoading(true)
                    if(res.data.status == 'OK'){
                        const response = res.data.data.filter((item) => item.id === id)[0]
                        const totalModule = response.module?.length
                        let count = 0
                        for (let i = 0; i < chapter1.length; i++) {
                            count = count + chapter1[i]?.time
                        }
                        let count2 = 0
                        for (let j = 0; j < chapter2.length; j++) {
                            count2 = count2 + chapter2[j]?.time
                        }
                        setCourse(response)
                        setTotalTimeCh1(count)
                        setTotalTimeCh2(count2)
                        setTotalTime(count + count2)
                        setTotalModule(totalModule)
                        setChapter1(response.module?.filter((item) => item.chapter === 1))
                        setChapter2(response.module?.filter((item) => item.chapter === 2))
                        setListText1(chapter2[0].title)
                        setListText2(chapter2[1].title)
                        setListText3(chapter2[2].title)
                        setCurrentModuleVideo(chapter1[0].video)
                        setCurrentModule(chapter1[0].id)
                        setIsLoading(false)
                    }
                }else{
                    setIsLoading(true)
                }
            }).catch((err) => {
                console.log(err);
            })

            getCurrentUserAPI();
            getModuleTrackingsByUserTrack();
            indicatorCourseValidation();
            courseDoneValidation();
        })
        

    const getModuleTrackingsByUserTrack = () => {
        if (moduleTrack.length <= 0) {
            consumeUserApi.getCurrentUser().then(user => {
                const filteredModule = course.module.filter(data => {
                    if (data.moduleTracking.length > 0) {
                        return data.moduleTracking.filter(item => {
                            if (item.userId == user.data.id) {
                                return item
                            }
                        })

                    }
                })
                setModuleTrack(filteredModule)
            })
        } else {
            return moduleTrack;
        }

    }

    const indicatorCourseValidation = () => {
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

        if(indicator > 0 ){
            setOpen(false)
        }
        setIndicatorPercent(indicator)
    }

    const courseDoneValidation = async () => {
        if(indicatorPercent == 100){
            const payload = {
                id : id ,
                status : 'DONE'
            }
            const res = await consumeCourseTrackingsApi.updateCourseTrackingsUser(payload);
            if(res.status){
                alert('Selamat Kelas Telah Selesai')
            }
        }
    }

    const getCurrentUserAPI = () => {
        consumeUserApi.getCurrentUser().then(res => {
            setUser(res.data)
        })
    }

    const createModuleTrackAPI = (payload) => {
        consumeModuleTrackingsApi.createModuleTrackingsUser(payload).then((res) => {
            if (res.status == 'OK') {
                console.log('module success')
            }
        })
    }
    const updateModuleTrackAPI = (payload) => {
        consumeModuleTrackingsApi.updateModuleTrackingsUser(payload).then((res) => {
            if (res.status == 'OK') {
                console.log('module update success')
            }
        })
    }

    const moduleTrackingChanged = async (type) => {
        if(type == 'PLAY'){
            consumeUserApi.getCurrentUser().then(user => {
                consumeModuleTrackingsApi.getModuleTrackings().then((res) => {
                    const moduleChecked = res.data.filter(modules => {
                        return modules.moduleId == moduleId == '' ? currentModule : moduleId
                    })    

                    if(moduleChecked.length > 0){
                        createModuleTrackAPI({
                            status: 'PROGRESS',
                            userId: user.data.id,
                            moduleId: moduleId == '' ? currentModule : moduleId
                        })
                    }else{
                        return false;
                    }
                })
            })
        }else if(type == 'END'){
            
            consumeModuleTrackingsApi.getModuleTrackings().then((res) => {
                const moduleChecked = res.data.filter(modules => {
                    var sampleModule = moduleId == '' ?  currentModule : moduleId
                    return modules.moduleId ==  sampleModule
                })    

                updateModuleTrackAPI({
                    id: moduleChecked[0].id,
                    status: 'DONE'
                })
            })

        }
    
    }

    return (
        <section>
            {/* <Dialog open={open} handler={handleOpen}>
                <div className="flex justify-end">
                    <button className="px-2 py-2" onClick={handleOpen}>
                        <Icon icon="material-symbols:close" className="text-3xl" />
                    </button>
                </div>
                <DialogHeader className="grid place-content-center">
                    <Typography variant="h3" className="text-center text-DARKBLUE05">
                        Onboarding...
                    </Typography>
                </DialogHeader>
                <DialogBody className="grid place-items-center gap-4">
                    <img src={illustration} alt="" />
                    <p className="font-medium text-sm text-black">Persiapkan hal berikut untuk belajar yang maksimal:</p>
                    <ul className="text-sm text-black text-center">
                        <li className="mb-1">Mempunyai akun Figma atau Install Adobe XD</li>
                        <li className="mb-1">Menggunakan internet minimal kecepatan 2Mbps</li>
                        <li className="mb-1">Belajar di tempat yang nyaman</li>
                    </ul>
                    <AnimatedButton>
                        <button className="mt-6 w-80 mb-4" onClick={handleOpen}>
                            <div className="bg-DARKBLUE05 rounded-full py-3 flex justify-center items-center gap-2">
                                <p className="text-white font-bold">Ikuti Kelas</p>
                            </div>
                        </button>
                    </AnimatedButton>
                </DialogBody>
            </Dialog> */}
            <div className="bg-LIGHTBLUE h-[250px]">
                <div className="lg:grid lg:place-content-center px-10 lg:px-0">
                    <div className="h-[250px]">
                        <div className="w-full lg:w-[1024px] pt-10">
                            <button className="flex justify-center items-center gap-4">
                                <Icon icon="ph:arrow-left-bold" className="text-2xl" onClick={() => history.back()} />
                                <p className="font-bold text-lg">Kelas Lainnya</p>
                            </button>
                            <CourseTitle
                            course={ course.category?.title}
                            rating={course.rating}
                            topic={course.title}
                            author={course.authorBy}
                            level={course.level}
                            module={totalModule + " Module"}
                            time={totalTime / 60 + " Minute"}
                            tele={course.telegram} />
                        </div>
                    </div>

                    <div className="w-full lg:w-[600px] mt-10">
                        <div className="w-full h-96 lg:w-[600px] lg:h-[320px] flex flex-col justify-center">
                            <ReactPlayer
                                url={moduleVideo == '' ? currentModuleVideo : moduleVideo}
                                light={true}
                                controls={true}
                                playing={true}
                                width={'100%'}
                                height={'100%'}
                                style={{ borderRadius: "24px", overflow: "hidden" }}
                                onPlay={()=>{moduleTrackingChanged('PLAY')}}
                                onEnded={()=>{moduleTrackingChanged('END')}}
                            />
                        </div>
                    </div>
                        
                    <div className="my-10 lg:my-0 w-full lg:w-[400px] lg:ml-auto lg:-mt-[540px] float-none lg:float-right rounded-2xl bg-white px-5 py-5" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <h1 className="text-lg font-bold">Materi Belajar</h1>
                            <ProgressBar
                                width={`${indicatorPercent}%`}
                                complete={`${indicatorPercent}% Complete`}
                            />
                        </div>
                        <div className="pt-2 pb-4">
                            <div className="flex justify-between mb-2">
                                <p className="text-DARKBLUE05 font-bold text-sm">Chapter 1 - Pendahuluan</p>
                                <p className="text-DARKBLUE03 font-bold text-sm">{totalTimeCh1 / 60} Menit</p>
                            </div>
                            { isLoading ? 
                            <div key={''} className="flex justify-between items-center my-2 cursor-pointer">
                                <Skeleton width={'350px'} count={4}/>
                            </div>
                            :
                            chapter1.map((item, index) => {
                                const checkedModuleDone = moduleTrack.filter(data => {
                                    if (data.id == item.id) {
                                        return item.moduleTracking.some(modules => modules.userId === user.id && modules.status === 'DONE');
                                    }
                                    return false;
                                })
                                const checkedModuleProgress = moduleTrack.filter(data => {
                                    if (data.id == item.id) {
                                        return item.moduleTracking.some(modules => modules.userId === user.id && modules.status === 'PROGRESS');
                                    }
                                    return false;
                                })
                                var videoStatus = ''
                                if (checkedModuleDone.length > 0) {
                                    videoStatus = 'DONE';
                                } else if(checkedModuleProgress.length > 0){
                                    videoStatus = 'PROGRESS';
                                } else {
                                    videoStatus = '';
                                }
                                
                                return (
                                    <div key={item.id} onClick={() => {
                                        setModuleId(item.id)
                                        setModuleVideo(item.video)
                                    }} className="flex justify-between items-center my-2 cursor-pointer">
                                        <Subject
                                            number={index + 1 + "."}
                                            subject={item.title}
                                        />
                                        <AnimatedButton>
                                            <button >
                                                <Icon icon="icon-park-solid:play" className={videoStatus == '' ? "text-2xl text-SUCCESS" : videoStatus == 'PROGRESS' ? "text-2xl text-yellow-200" : videoStatus == 'DONE' ? "text-2xl text-DARKBLUE05"  : "text-2xl text-SUCCESS"} />
                                            </button>
                                        </AnimatedButton>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="pt-2">
                            <div className="flex justify-between mb-2">
                                <p className="text-DARKBLUE05 font-bold text-sm">Chapter 2 - Memulai Module</p>
                                <p className="text-DARKBLUE03 font-bold text-sm">{totalTimeCh2 / 60} Menit</p>
                            </div>
                            { isLoading ? 
                            <div key={''} className="flex justify-between items-center my-2 cursor-pointer">
                                <Skeleton width={'350px'} count={4}/>
                            </div>
                            :
                            chapter2.map((item, index) => {
                                const checkedModuleDone = moduleTrack.filter(data => {
                                    if (data.id == item.id) {
                                        return item.moduleTracking.some(modules => modules.userId === user.id && modules.status === 'DONE');
                                    }
                                    return false;
                                })
                                const checkedModuleProgress = moduleTrack.filter(data => {
                                    if (data.id == item.id) {
                                        return item.moduleTracking.some(modules => modules.userId === user.id && modules.status === 'PROGRESS');
                                    }
                                    return false;
                                })
                                var videoStatus = ''
                                if (checkedModuleDone.length > 0) {
                                    videoStatus = 'DONE';
                                }   else if(checkedModuleProgress.length > 0){
                                    videoStatus = 'PROGRESS';
                                } else {
                                    videoStatus = '';
                                }
                                
                                return (
                                    <div key={item.id} onClick={() => {
                                        setModuleId(item.id)
                                        setModuleVideo(item.video)
                                    }} className="flex justify-between items-center my-2 cursor-pointer">
                                        <Subject
                                            number={index + 1 + "."}
                                            subject={item.title }
                                        />
                                        <AnimatedButton>
                                            <div >
                                                <Icon icon="icon-park-solid:play" className={videoStatus == '' ? "text-2xl text-SUCCESS" : videoStatus == 'PROGRESS' ? "text-2xl text-yellow-200" : videoStatus == 'DONE' ? "text-2xl text-DARKBLUE05"  : "text-2xl text-SUCCESS"} />
                                            </div>
                                        </AnimatedButton>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full lg:w-[600px]">
                        <div className="mt-5 lg:mt-0 mb-10">
                            <h1 className="font-bold text-2xl mb-2">Tentang Kelas</h1>
                            <div>
                                <p className="text-justify mb-4">
                                    {course.description ?? <Skeleton count={4}/>}
                                </p>
                            </div>
                            <h1 className="font-bold text-2xl mb-2">Kelas Ini Ditujukan Untuk?</h1>
                            <ol className="list-decimal list-inside">
                                <li className="py-2">Anda yang ingin memahami poin penting { !isLoading ? listText1 : <Skeleton width={'100px'}/> } </li>
                                <li className="py-2">Anda yang ingin membantu perusahaan lebih optimal dalam {!isLoading ? listText2 : <Skeleton width={'100px'}/> } </li>
                                <li className="py-2">Anda yang ingin latihan {!isLoading ? listText3 : <Skeleton width={'100px'}/> } </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    )
}

export default CourseDetailUnlock
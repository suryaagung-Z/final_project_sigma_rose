import { Icon } from '@iconify/react';
import logo from '../../assets/img/craftiq.png'
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import NavbarButton from '../Button/NavbarButton';
import { getNotifications } from '../../api/servicesApi';
import { getCourses } from "../../api/servicesApi";
import AnimatedButton from "../Button/AnimatedButton";
import Card from "../CourseCard/Card"
import getCookieValue from '../../api/getCookie';
import { useDispatch } from 'react-redux';
import { updateId } from '../../store/moduleCourses';
import { formatRupiah } from '../../lib/rupiahFormat';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
} from "@material-tailwind/react";

import {
    Drawer,
    List,
    ListItem,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const token = getCookieValue("token");
    const [isLogin, setIsLogin] = useState(false)
    const [notification, setNotification] = useState(0)

    const [openModal, setOpenModal] = useState(false);
    const [openModalPremium, setOpenModalPremium] = useState(false);
    const [isKelasActive, setKelasActive] = useState(false);
    const [isBellActive, setBellActive] = useState(false);
    const [isUserActive, setUserActive] = useState(false);
    const [course, setCourse] = useState([])
    const [currentCourse, setCurrentCourse] = useState([])
    const [courseSelection, setCourseSelection] = useState({})


    useEffect(() => {
        const path = location.pathname;
        setKelasActive(path === '/courseTrackings');
        setBellActive(path === '/notification');
        setUserActive(path === '/user');
    }, [location.pathname]);

    const handleKelasClick = () => {
        setKelasActive(true);
        setBellActive(false);
        setUserActive(false);
        navigate("/courseTrackings")
    };

    const handleBellClick = () => {
        setKelasActive(false);
        setBellActive(true);
        setUserActive(false);
        navigate("/notification")
    };

    const handleUserClick = () => {
        setKelasActive(false);
        setBellActive(false);
        setUserActive(true);
        navigate("/user")
    };

    useEffect(() => {
        if (token === null) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [token])

    useEffect(() => {
        if (isLogin) {
            getNotifications()
                .then((res) => {
                    const data = res.data.data.filter((item) => item.isViewed === false);
                    const response = data.length;
                    setNotification(response);
                });
        }
    }, [notification, isLogin]);

    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const handleOpen = () => setOpenModal(!openModal)
    const handleOpenPremium = () => setOpenModalPremium(!openModalPremium)


    useEffect(()=>{
        getCourseAPI();
    })

    const getCourseAPI = () => {
        if(course.length <= 0){
            getCourses().then((res) => {
                const response = res.data.data
                if(res.data.status == 'OK'){
                    setCurrentCourse(response)
                    setCourse(response)
                }
            })
        }else{
            return course;
        }
    }

    const searchCourse = (event) => {
            event.target.value;
            const fieldClass = document.getElementById('searchClass').value

            const courseFiltered = currentCourse.filter(( data) => {
                return `${data.title + '' + data.category.title}`.toLowerCase().indexOf(fieldClass.toLowerCase()) > -1;
            })

            setCourse(courseFiltered)
    }

    return (
        <>
            <nav className="w-full bg-DARKBLUE05 h-[100px]">
                <div className='lg:grid lg:place-content-center px-6 lg:px-0'>
                    <div className='flex w-full lg:w-[1024px] py-5 items-center justify-between lg:justify-start'>
                        <button onClick={() => navigate("/")}>
                            <img src={logo} alt="" className='my-auto w-[183.2px] h-[52.6px] mt-1 lg:mt-0' />
                        </button>
                        <button onClick={openDrawer} className='lg:hidden bg-white bg-opacity-20 w-12 h-12 rounded-2xl flex justify-center items-center'>
                            <Icon icon="ph:list-bold" className='text-3xl text-white' />
                        </button>
                        <div className="my-auto hidden lg:inline">
                            <div className="bg-white ml-10 w-[526px] h-[62px] rounded-2xl">
                                <div className="py-3 px-6 flex gap-8">
                                    <input onClick={()=>{handleOpen()}} type="text" className="w-[424px] outline-none border-none" placeholder="Cari Kursus Terbaik.." />
                                    <button className="bg-DARKBLUE05 flex items-center justify-center w-[38px] h-[38px] rounded-lg">
                                        <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {isLogin ?
                            <div className='hidden lg:inline my-auto ml-auto'>
                                <div className="flex gap-4 items-center relative">
                                    <NavbarButton isActive={isKelasActive} onClick={handleKelasClick} icon="tabler:list" text="Kelas" />
                                    <div className='static flex items-center'>
                                        <NavbarButton isActive={isBellActive} onClick={handleBellClick} icon="lucide:bell" text="Notifikasi" />
                                        {notification === 0 ? null :
                                            <div className="absolute translate-x-3 -translate-y-4">
                                                <div className='relative'>
                                                    <div className='bg-red-500 rounded-full h-5 w-5 border-2 border-white'></div>
                                                    <p className='text-center absolute inset-0 text-white text-sm font-medium'>{notification}</p>
                                                </div>
                                            </div>}
                                    </div>
                                    <NavbarButton isActive={isUserActive} onClick={handleUserClick} icon="lucide:user" text="Akun" />
                                </div>
                            </div> :
                            <div className='hidden lg:inline lg:ml-auto'>
                                <button className='flex gap-2 items-center justify-center my-auto' onClick={() => navigate("/login")}>
                                    <Icon icon="ic:round-login" color="white" />
                                    <p className='text-white font-medium'>Masuk</p>
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <Drawer open={open} onClose={closeDrawer} placement="right" className='lg:hidden'>
                    <div className="mb-2 flex items-center justify-between p-4">
                        <h1 className='text-xl font-medium'>Menu</h1>
                        <Icon icon="ion:close" className='text-3xl cursor-pointer' onClick={closeDrawer} />
                    </div>
                    <div className="my-auto p-4">
                        <div className="bg-white border-2 w-full h-[62px] rounded-2xl">
                            <div className="py-2.5 px-3 flex gap-3">
                                <input type="text" className="w-[190px] outline-none border-none" placeholder="Cari Kursus Terbaik.." />
                                <button className="bg-DARKBLUE05 flex items-center justify-center w-[38px] h-[38px] rounded-lg">
                                    <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {isLogin ?
                        <List>
                            <ListItem className="" onClick={() => { handleKelasClick(); closeDrawer() }}>
                                <NavbarButton isActive={isKelasActive} icon="tabler:list" text="Kelas" />
                            </ListItem>
                            <ListItem onClick={() => { handleBellClick(); closeDrawer() }}>
                                <NavbarButton isActive={isBellActive} icon="lucide:bell" text="Notifikasi" />
                                <ListItemSuffix>
                                    {notification === 0 ? null :
                                        <Chip
                                            value={notification}
                                            size="sm"
                                            color="red"
                                            className="rounded-full"
                                        />
                                    }
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem onClick={() => { handleUserClick(); closeDrawer() }}>
                                <NavbarButton isActive={isUserActive} icon="lucide:user" text="Akun" />
                            </ListItem>
                        </List> :
                        <List>
                            <ListItem onClick={() => { navigate("/login"); closeDrawer() }}>
                                <button className='flex gap-2 items-center justify-center lg:my-auto lg:ml-auto'>
                                    <Icon icon="ic:round-login" className='text-black lg:text-white' />
                                    <p className='text-black lg:text-white font-medium'>Masuk</p>
                                </button>
                            </ListItem>
                        </List>
                    }
                </Drawer>
            </nav>
            <main>

            <Dialog open={openModal} handler={handleOpen}>
                <div className="flex justify-end">
                    <button className="px-2 py-2" onClick={handleOpen}>
                        <Icon icon="material-symbols:close" className="text-3xl" />
                    </button>
                </div>
                <DialogBody className="grid place-items-center gap-4">
                    <div className="bg-white ml-10 w-[526px] h-[62px] rounded-2xl shadow-lg">
                        <div className="py-3 px-6 flex gap-8 ">
                            <input id='searchClass' onChange={(event)=> {searchCourse(event)}} type="text" className="w-[424px] outline-none border-none " placeholder="Cari Kursus Terbaik.." />
                            <button className="bg-DARKBLUE05 flex items-center justify-center w-[38px] h-[38px] rounded-lg">
                                <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    
                    {/*  */}

                    <div className=' h-[500px] w-[526px] overflow-y-scroll  flex flex-col items-center scrollbar scrollbar-thumb-gray-100 scrollbar-track-white scrollbar-w-2 scrollbar-thumb-rounded-2xl'>
                        {
                            course.map((data)=>{
                                return(
                                    <div key={data.id} className='my-[20px]'>
                                        <AnimatedButton >
                                            <Card
                                                onClick={()=>{

                                                    if(data.type === 'PREMIUM'){
                                                        if(token === null){
                                                            navigate("/login")
                                                            handleOpen()
                                                        }else{
                                                            handleOpenPremium()
                                                            handleOpen()
                                                            setCourseSelection(data)
                                                            dispatch(updateId(data.id))
                                                        }
                                                    }else{
                                                        navigate("/courses/detail")
                                                        handleOpen()
                                                        dispatch(updateId(data.id))
                                                    }

                                                }}
                                                picture={data.image}
                                                course={data.category.title}
                                                rating={data.rating}
                                                topic={data.title}
                                                author={data.authorBy}
                                                level={data.level}
                                                module={`${data.module.length} Module`}
                                                time={
                                                    `${data.module.reduce((accumulator, currentValue) => {
                                                        return accumulator + currentValue.time;
                                                    }, 0) / 60} Menit`
                                                }
                                                price={formatRupiah(data.price)}
                                            />
                                    </AnimatedButton>
                                    </div>
                                )
                            })
                        }
                    </div>
                </DialogBody>
            </Dialog>
            <Dialog open={openModalPremium} handler={()=>setOpenModalPremium(!openModalPremium)}>
                <div className="flex justify-end">
                    <button className="px-2 py-2" onClick={()=>setOpenModalPremium(!openModalPremium)}>
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
                        module={ courseSelection.module != null ? courseSelection.module.length : 10 + " Module"}
                        time={
                            courseSelection.module != null ? `${courseSelection.module.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue.time;
                            }, 0) / 60} Menit`  :  '26 Menit'
                        }
                        price={formatRupiah(courseSelection.price ?? 19999)} />
                    <AnimatedButton>
                    <button className="mt-6 w-80 mb-4" onClick={() => {
                                navigate("/payment")
                                handleOpenPremium()
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
                <Outlet />
            </main>
        </>
    )
}

export default Navbar
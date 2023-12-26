import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import { Icon } from '@iconify/react';
import amex from "../assets/img/amex.png"
import mc from "../assets/img/mc.png"
import paypal from "../assets/img/paypal.png"
import visa from "../assets/img/visa.png"

import Footer from "../components/Footer/Footer"
import CardPayment from "../components/CourseCard/CardPayment"

import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { getCourses } from "../api/servicesApi";
import { formatRupiah } from "../lib/rupiahFormat";
import { consumeOrderApi } from "../api/order";
import { consumeUserApi } from "../api/user";
import { consumeCourseTrackingsApi } from "../api/courseTrackings";
import { consumeNotificationApi } from "../api/notification";
import AllertReset from '../components/Allert/AllertReset'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

// eslint-disable-next-line react/prop-types
function Symbol({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const Payment = () => {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const navigate = useNavigate()

    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cvv, setCvv] = useState('');
    const [expiredDate, setExpiredDate] = useState("");
    const [expPayDate, setExpPayDate] = useState("");
    const [module, setModule] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertAction, setAlertAction] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const id = useSelector((state) => state.module.id)
    useEffect(() => {

        setExpPayDateFunction()

        getCourses()
            .then((res) => {
                setIsLoading(true)
                const response = res.data.data.filter((item) => item.id === id)[0]
                setModule(response)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err);
            })

    },[id])

    useEffect(()=>{
        setAlertTime()
    })

    const setAlertTime = () => {
        if (alertAction) {
            setTimeout(() => {
                setAlertAction(false)
            }, 5000);
        }
    }

    const setExpPayDateFunction = () => {

        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
        var dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        var timeOptions = { hour: 'numeric', minute: 'numeric' };

        var dateFormat = currentDate.toLocaleDateString('id-ID', dateOptions);
        var timeFormat = currentDate.toLocaleTimeString('id-ID', timeOptions);

        setExpPayDate(`${dateFormat} ${timeFormat}`)
    }

    const createCourseTracking = (payload) => {
        consumeUserApi.getCurrentUser().then(res => {
            const { status , courseId } = payload
            consumeCourseTrackingsApi.createCourseTrackingsUser({
                status : status,
                userId : res.data.id,
                courseId : courseId
            }).then(res => {
                if(res.status == 'OK'){
                    navigate("/payment/success")
                    createNotificationOrderClass(module.title)
                }else{
                    alert('Kursus Sedang Berjalan')
                }
            })
        })
    }

    const createNotificationOrderClass = (course) => {
        const payload = {
            title : 'Kelas Order',
            subtitle : `Kelas ${course} sudah dipesan`,
            description :`Ikuti kelas hingga selesai dan mendapatkan value yang diharapkan`
        }

        consumeNotificationApi.postNotification(payload).then(res => {
            if(res.status != 'OK'){
                return false;
            }
        })
    }

    const paymentFunction = async () => {

        const cvvField = document.getElementById('cvvField').value;

        if(module.type == 'FREE'){
            createCourseTracking({ status : 'PROGRESS' , courseId : module.id })
        }else{
            if (cardNumber == "" && cardHolderName == "" && cvv == "" && expiredDate == "") {
                setAlertAction(true)
                setAlertStatus(false)
                setAlertMsg('Mohon diisi kartu pembayarannya')
            } else {
                const payload = {
                    courseId: id,
                        payment: {
                            cardNumber: cardNumber,
                            cardName: cardHolderName,
                            cvv: cvvField != '' ? parseInt(cvvField) : 123,
                            expiryDate: new Date(),
                            amount: 4000000
                        }
                    }

                    consumeOrderApi.createOrderUser(payload).then((res)=>{
                        if(res.status == 'OK' ){
                            navigate("/payment/success")
                            createNotificationOrderClass(module.title)
                        }else{
                            if(res.response.data.message == "Order has already been placed"){
                                setAlertAction(true)
                                setAlertStatus(false)
                                setAlertMsg('Kelas Sudah di Order')
                            }
                        }
                    })
                
            }
        }


    }

    return (
        <section>
            <div className="bg-white px-20 py-10 h-48" style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15" }}>
                <div className="grid place-content-center">
                    <div className="w-[1024px]">
                        <button onClick={() => navigate("/courses/detail")} className="flex justify-center items-center gap-4">
                            <Icon icon="ph:arrow-left-bold" className="text-xl" onClick={() => history.back()} />
                            <p className="font-bold">Kembali</p>
                        </button>
                        <div className="flex items-center justify-center">
                            <div className="rounded-xl bg-WARNING mt-10 py-3 w-[800px]">
                                <p className="text-white font-medium text-center">Selesaikan Pembayaran sampai {expPayDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid place-content-center">
                <div className="w-[1024px]">
                    <div className="py-10 flex justify-between">
                        <div className="w-[550px] relative">
                            <Accordion open={open === 1} icon={<Symbol id={1} open={open} />} className="mb-4 rounded-md bg-DARKGREY02" style={{ boxShadow: "0px 3px 2px 0px rgba(0, 0, 0, 0.05)" }}>
                                <AccordionHeader
                                    onClick={() => handleOpen(1)}
                                    className={"border-b-0 px-4 text-white hover:!text-LIGHTBLUE"}
                                >
                                    Bank Transfer
                                </AccordionHeader>
                                <AccordionBody className="px-12 py-8 text-base font-normal bg-white">
                                <div className="flex items-center justify-center">
                                        <div>
                                            <div className="mb-6">
                                                <p className="font-medium text-black mb-1">No Rekening</p>
                                                <input onChange={(event) => {
                                                    setCardNumber(event.target.value)
                                                }} type="text" placeholder="4480 0000 0000 0000" className="focus:outline-none focus:ring-0 mb-1" />
                                                <hr className="w-80 h-0.5 bg-LIGHTGREY" />
                                            </div>
                                            <div className="mb-6">
                                                <p className="font-medium text-black mb-1">Card Name</p>
                                                <input onChange={(event) => { setCardHolderName(event.target.value) }} type="text" placeholder="John Doe" className="focus:outline-none focus:ring-0 mb-1" />
                                                <hr className="w-80 h-0.5 bg-LIGHTGREY" />
                                            </div>
                                
                                        </div>
                                    </div>
                                </AccordionBody>
                            </Accordion>
                            <Accordion open={open === 2} icon={<Symbol id={2} open={open} />} className="rounded-md bg-DARKBLUE05" style={{ boxShadow: "0px 3px 2px 0px rgba(0, 0, 0, 0.05)" }}>
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className={"border-b-0 px-4 text-white hover:!text-LIGHTBLUE"}
                                >
                                    Credit Card
                                </AccordionHeader>
                                <AccordionBody className="px-12 py-8 text-base font-normal bg-white">
                                    <div className="flex gap-4 items-center justify-center mb-10">
                                        <img src={mc} alt="" />
                                        <img src={visa} alt="" />
                                        <img src={amex} alt="" />
                                        <img src={paypal} alt="" />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div>
                                            <div className="mb-6">
                                                <p className="font-medium text-black mb-1">Card number</p>
                                                <input onChange={(event) => {
                                                    setCardNumber(event.target.value)
                                                }} type="text" placeholder="4480 0000 0000 0000" className="focus:outline-none focus:ring-0 mb-1" />
                                                <hr className="w-80 h-0.5 bg-LIGHTGREY" />
                                            </div>
                                            <div className="mb-6">
                                                <p className="font-medium text-black mb-1">Card holder name</p>
                                                <input onChange={(event) => { setCardHolderName(event.target.value) }} type="text" placeholder="John Doe" className="focus:outline-none focus:ring-0 mb-1" />
                                                <hr className="w-80 h-0.5 bg-LIGHTGREY" />
                                            </div>
                                            <div className="flex gap-3 mb-6">
                                                <div className="">
                                                    <p className="font-medium text-black mb-1">CVV</p>
                                                    <input id="cvvField" onChange={(event) => { setCvv(event.target.value) }} type="text" placeholder="000" className="focus:outline-none focus:ring-0 mb-1" />
                                                    <hr className="w-32 h-0.5 bg-LIGHTGREY" />
                                                </div>
                                                <div className="">
                                                    <p className="font-medium text-black mb-1">Expired date</p>
                                                    <input onChange={(event) => { setExpiredDate(event.target.value) }} type="text" placeholder="07/24" className="focus:outline-none focus:ring-0 mb-1" />
                                                    <hr className="w-32 h-0.5 bg-LIGHTGREY" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionBody>
                            </Accordion>
                            <div className="absolute w-[100%] flex justify-center">
                            {
                                alertAction ?
                                <div className='relative mt-[10px] '>
                                        <AllertReset
                                        message={ alertMsg }
                                        type={alertStatus ? 'success' : 'warning' }
                                />
                                </div>: '' 
                            }
                            </div>
                        </div>
                        <div>
                            <div className="w-[400px] rounded-2xl border border-DARKBLUE05 py-6 px-8" style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
                                <h1 className="text-xl font-semibold mb-4">Pembayaran Kelas</h1>
                                <div className="flex items-center justify-center mb-4">
                                    {
                                        isLoading ?
                                        <div >
                                            <Skeleton height={'100px'} width={'323px'}/>
                                            <Skeleton count={3} />
                                        </div>
                                        :
                                        <CardPayment
                                        picture={module.image}
                                        course={module.category?.title}
                                        topic={module.title}
                                        author={module.authorBy}
                                        />
                                    }
                                </div>
                                <div className="flex justify-between mb-10">
                                    <div>
                                        <p className="font-medium text-sm">Harga</p>
                                        <p className="font-semibold text-sm">{module.type == 'FREE' ? 'Gratis' : formatRupiah(module.price ?? 199999)}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">PPN 11%</p>
                                        <p className="font-semibold text-sm">{module.type == 'FREE' ? 'Gratis' : formatRupiah((module.price / 100 * 11).toFixed(0) ?? 199999)}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Total Bayar</p>
                                        <p className="font-semibold text-sm text-DARKBLUE05">{
                                            module.type == 'FREE' ? 'Gratis' : formatRupiah(module.price + parseInt((module.price / 100 * 11).toFixed(0)))

                                        }</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button id='paymentButton' onClick={() => {
                                        paymentFunction()
                                    }} className="flex items-center justify-center gap-2 bg-WARNING rounded-full w-80 py-3 px-6 text-center">
                                        <p className="text-white text-sm font-medium">Bayar dan Ikuti Kelas Selamanya</p>
                                        <Icon icon="carbon:next-filled" className="text-white text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[20px]"></div>
            <Footer />
        </section>
    )
}

export default Payment
import React from 'react';
import { Icon } from '@iconify/react';
// import NavbarAlreadyLogin from '../components/Navbar/NavbarAlreadyLogin';
import { useEffect, useState } from 'react';
import Footer from "../components/Footer/Footer"
import CardPaid from '../components/CourseCard/CardPaid';
import { useNavigate } from "react-router-dom"
import { consumeUserApi } from '../api/user';
import { consumeOrderApi } from '../api/order';
import AllertReset from '../components/Allert/AllertReset';
import fire from '../lib/firebaseInit'
import { getStorage, ref, uploadBytes ,getDownloadURL , } from "firebase/storage";

const Account = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertAction, setAlertAction] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showNew1Pass, setShowNew1Pass] = useState(false);
    const [imageProfile, setImageProfile] = useState('');
    const [imageUp, setImageUp] = useState('');

    const [isProfileVisible, setProfileVisibility] = useState(false);
    const [isSetPasswordVisible, SetPasswordVisibility] = useState(false);
    const [isHistoryVisible, SetHistoryVisibility] = useState(false);

    useEffect(() => {

        currentUserAPI();
        orderUserAPI();
        updateUserProfile();
        updateUserPass();
        setAlertTime();

    })

    const currentUserAPI = () => {
        if (user.length <= 0) {
            consumeUserApi.getCurrentUser().then((res) => {
                setUser(res.data)
            })
        } else {
            return user;
        }

    }

    const orderUserAPI = () => {
        if (orderHistory.length <= 0) {
            consumeOrderApi.getOrderUser().then((res) => {
                if (res.status == 'OK') {
                    setOrderHistory(res.data)
                }
            })
        } else {
            return orderHistory;
        }
    }

    const updateUserProfile = async () => {
        const name = document.getElementById('field-name').value;
        const email = document.getElementById('field-email').value;
        const phone = document.getElementById('nomorTelepon').value;
        const country = document.getElementById('field-country').value;
        const city = document.getElementById('field-city').value;

        if (imageProfile == '') {
            if(name != '' && email != '' && phone != '' && country != '' && city != ''){
                await consumeUserApi.updateUser({
                    name: name,
                    email: email,
                    phone: phone,
                    country: country,
                    city: city
                }).then((res) => {
                    if (res.status == 'OK') {
                        setAlertAction(true)
                        setAlertStatus(true)
                    } else {
                        setAlertAction(true)
                        setAlertStatus(false)
                    }
                })
            }
        // eslint-disable-next-line no-dupe-else-if
        } else if(imageProfile != '') {
            if(name != '' && email != '' && phone != '' && country != '' && city != '' && imageProfile != ''){
                await uploadImage(imageProfile)

                await consumeUserApi.updateUser({
                    name: name,
                    email: email,
                    phone: phone,
                    image : imageUp,
                    country: country,
                    city: city
                }).then((res) => {
                    if (res.status == 'OK') {
                        setAlertAction(true)
                        setAlertStatus(true)
                    } else {
                        setAlertAction(true)
                        setAlertStatus(false)
                    }
                })
            }
        }else {
            setAlertAction(true)
            setAlertStatus(false)
        }

    }
    
    const uploadImage = async () => {
        const storage = getStorage(fire);
        const storageRef = ref(storage, `image-${Date.now()}.jpg`);
        
        try {
            fetch(imageProfile)
            .then(response => response.blob())
            .then(async (blob) => {
                const snapshot = await uploadBytes(storageRef, blob);
                const imageUrl = await getDownloadURL(snapshot.ref);
                setImageUp(imageUrl);
            })

        } catch (error_1) {
            return error_1;
        }
    }

    const updateUserPass = () => {
        const oldPass = document.getElementById('old-pass').value;
        const newPass = document.getElementById('new-pass').value;
        const newPassAgain = document.getElementById('new-pass-again').value;
        const updateButton = document.getElementById('up-pass-button');

        updateButton.onclick = () => {
            if (newPass === newPassAgain) {
                consumeUserApi.updatePassword({
                    password: oldPass,
                    newPassword: newPassAgain
                }).then((res) => {
                    if (res.status == 'OK') {
                        setAlertAction(true)
                        setAlertStatus(true)
                    } else {
                        setAlertAction(true)
                        setAlertStatus(false)
                    }
                })
            } else {
                setAlertAction(true)
                setAlertStatus(false)
            }
        }

    }

    const setAlertTime = () => {
        if (alertAction) {
            setTimeout(() => {
                setAlertAction(false)
            }, 5000);
        }
    }

    const handleImageProfile = () => {

        const imageInput = document.getElementById('fileInput')

        imageInput.onchange = (e) => {
            
            setImageProfile(URL.createObjectURL(e.target.files[0]))
        }

        imageInput.click()

    }

    const toggleProfileVisibility = () => {
        setProfileVisibility(!isProfileVisible);
        SetPasswordVisibility(false);
        SetHistoryVisibility(false);
    };

    const toggleSetPasswordVisibility = () => {
        SetPasswordVisibility(!isSetPasswordVisible);
        setProfileVisibility(false);
        SetHistoryVisibility(false);
    };

    const toggleHistoryVisibility = () => {
        SetHistoryVisibility(!isHistoryVisible);
        setProfileVisibility(false);
        SetPasswordVisibility(false);
    };

    const profileButtonSize = isProfileVisible ? 'text-lg font-black text-DARKBLUE05' : 'text-md'
    const setPasswordButtonSize = isSetPasswordVisible ? 'text-lg font-black text-DARKBLUE05' : 'text-md'
    const historyButtonSize = isHistoryVisible ? 'text-lg font-black text-DARKBLUE05' : 'text-md'

    const handleExit = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/home")
    }

    return (
        <section>
            <div className="bg-LIGHTBLUE h-[170px]">
                <div className='lg:grid lg:place-content-center px-4 lg:px-0'>
                    <div className="w-full lg:w-[1024px] pt-10">
                        <div>
                            <div className='mb-12'>
                                <button className="flex justify-center items-center gap-4 mb-10" onClick={() => history.back()} >
                                    <Icon icon="ph:arrow-left-bold" className="text-xl text-DARKBLUE05" />
                                    <p className="font-bold text-DARKBLUE05">Kembali ke Beranda</p>
                                </button>
                            </div>
                            <div className='flex justify-center'>
                                <div className='grid place-content-center w-full md:w-[720px] lg:w-[900px] bg-DARKBLUE05 py-4 rounded-t-2xl'>
                                    <div>
                                        <p className='text-white font-medium'>Akun</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:grid md:place-content-center px-4 md:px-0 mb-20'>
                    <div className="w-full lg:w-[1024px]">
                        <div>
                            <div className='flex justify-center'>
                                <div className='grid md:grid-flow-col grid-cols-1 w-full md:w-[720px] lg:w-[900px] border border-DARKBLUE05 rounded-b-2xl'> 
                                    <div className='w-full md:w-[300px] lg:w[370px] px-10 md:px-0 bg-LIGHTBLUE md:bg-transparent rounded-b-2xl'>
                                        <div className='flex justify-between md:flex-col py-4 px-0 md:px-4'>
                                            <button onClick={toggleProfileVisibility}>
                                                <div className='flex items-center gap-4 py-4'>
                                                    <Icon icon="iconamoon:edit" className='text-DARKBLUE05 text-3xl' />
                                                    <p className={`font-medium ${profileButtonSize} hidden md:inline`}>Profil Saya</p>
                                                </div>
                                            </button>
                                            <hr className="w-64 lg:w-80 h-0.5 bg-LIGHTGREY hidden md:inline"/>
                                            <button onClick={toggleSetPasswordVisibility}>
                                                <div className='flex items-center gap-4 py-4'>
                                                    <Icon icon="lets-icons:setting-line" className='text-DARKBLUE05 text-3xl' />
                                                    <p className={`font-medium ${setPasswordButtonSize} hidden md:inline`}>Ubah Password</p>
                                                </div>
                                            </button>
                                            <hr className="w-64 lg:w-80 h-0.5 bg-LIGHTGREY hidden md:inline"/>
                                            <button onClick={toggleHistoryVisibility}>
                                                <div className='flex items-center gap-4 py-4'>
                                                    <Icon icon="mdi:cart-outline" className='text-DARKBLUE05 text-3xl' />
                                                    <p className={`font-medium ${historyButtonSize} hidden md:inline`}>Riwayat Pembayaran</p>
                                                </div>
                                            </button>
                                            <hr className="w-64 lg:w-80 h-0.5 bg-LIGHTGREY hidden md:inline"/>
                                            <button onClick={handleExit}>
                                                <div className='flex items-center gap-4 py-4'>
                                                    <Icon icon="ic:round-logout" className='text-DARKBLUE05 text-3xl' />
                                                    <p className='font-medium hidden md:inline'>Keluar</p>
                                                </div>
                                            </button>
                                            <hr className="w-64 lg:w-80 h-0.5 bg-LIGHTGREY hidden md:inline"/>
                                            {/* <div className='flex justify-center mt-10'>
                                                <p className='text-sm text-DARKGREY'>Version 1.1.0</p>
                                            </div> */}
                                        </div> 
                                    </div>
                                    <div className='w-full md:w-[405px] lg:w-[505px]'>
                                        <div className={`grid place-content-center py-8 ${isProfileVisible ? '' : 'hidden'}`}>
                                            <div className='flex justify-center mb-6'>
                                                <h1 className='font-bold text-2xl'>Profil Saya</h1>
                                            </div>
                                            <div className='flex justify-center'>
                                                <div className='bg-DARKBLUE05 w-24 h-24 rounded-full flex justify-center items-center mb-6'>
                                                    <img  className='w-24 h-24 rounded-full border-[4px] border-DARKBLUE05 ' src={ imageProfile != '' ? imageProfile : user.image != '' ? user.image : user.image } alt='profile-photos' ></img>
                                                </div>
                                                <div className='self-end absolute ml-[50px] mb-[20px] bg-white p-[4px] rounded-lg' >
                                                    <input id='fileInput' type="file" hidden/>
                                                    <Icon onClick={()=>{handleImageProfile()}} icon="tabler:photo" className='text-DARKBLUE05 text-2xl'/>
                                                </div>
                                            </div>
                                            <div className='mb-6'>
                                                <div className='mb-4'>
                                                    <p className='mb-2'>Nama</p>
                                                    <div className='w-80 rounded 2-xl border border-DARKGREY p-2'>
                                                        <input  id='field-name' type="text" placeholder={user.name} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    </div>
                                                </div>
                                                <div className='mb-4'>
                                                    <p className='mb-2'>Email</p>
                                                    <div className='w-80 rounded 2-xl border border-DARKGREY p-2'>
                                                        <input id='field-email' type="email" placeholder={user.email} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    </div>
                                                </div>
                                                <div className='mb-4'>
                                                    <p className='mb-2'>Nomor Telepon</p>
                                                    <div className='w-80 rounded 2-xl border border-DARKGREY p-2'>
                                                        <input type="tel" id="nomorTelepon" name="nomorTelepon" pattern="[+]\d{2}\d{9,12}" placeholder={user.phone} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    </div>
                                                </div>
                                                <div className='mb-4'>
                                                    <p className='mb-2'>Negara</p>
                                                    <div className='w-80 rounded 2-xl border border-DARKGREY p-2'>
                                                        <input id='field-country' type="text" placeholder={user.country} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    </div>
                                                </div>
                                                <div className='mb-4'>
                                                    <p className='mb-2'>Kota</p>
                                                    <div className='w-80 rounded 2-xl border border-DARKGREY p-2'>
                                                        <input id='field-city' type="text" placeholder={user.city} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button id='up-profile-button'>
                                                <div className='bg-DARKBLUE05 p-3 rounded-full'>
                                                    <p className='text-lg text-white font-bold'>Simpan Profil Saya</p>
                                                </div>
                                            </button>
                                        </div>
                                    <div className={`w-full md:w-[405px] grid place-content-center py-8 ${isSetPasswordVisible ? '' : 'hidden'}`}>
                                        <div className='flex justify-center mb-6'>
                                            <h1 className='font-bold text-2xl'>Ubah Password</h1>
                                        </div>
                                        <div className='mb-6'>
                                            <div className='mb-4'>
                                                <p className='mb-2'>Masukkan Password Lama</p>
                                                <div className='w-80 rounded 2-xl border border-DARKGREY p-2 flex justify-between'>
                                                    <input id='old-pass' type={showPass ? 'text' : "password"} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    <Icon onClick={()=>{setShowPass(!showPass)}} icon="lucide:eye" className='text-DARKGREY text-2xl'/>
                                                </div>
                                            </div>
                                            <div className='mb-4'>
                                                <p className='mb-2'>Masukkan Password Baru</p>
                                                <div className='w-80 rounded 2-xl border border-DARKGREY p-2 flex justify-between'>
                                                    <input id='new-pass' type={showNewPass ? 'text' : "password"} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    <Icon onClick={()=>{setShowNewPass(!showNewPass)}} icon="lucide:eye" className='text-DARKGREY text-2xl'/>
                                                </div>
                                            </div>
                                            <div className='mb-4'>
                                                <p className='mb-2'>Ulangi Password Baru</p>
                                                <div className='w-80 rounded 2-xl border border-DARKGREY p-2 flex justify-between'>
                                                    <input id='new-pass-again'  type={showNew1Pass ? 'text' : "password"} className="focus:outline-none focus:ring-0 text-sm bg-transparent" />
                                                    <Icon onClick={()=>{setShowNew1Pass(!showNew1Pass)}} icon="lucide:eye" className='text-DARKGREY text-2xl'/>
                                                </div>
                                            </div>
                                        </div>
                                        <button id='up-pass-button' onClick={()=>{updateUserProfile()}} >
                                            <div className='bg-DARKBLUE05 p-3 rounded-full'>
                                                <p className='text-lg text-white font-bold'>Ubah Password</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div className={`w-full md:w-[405px] grid place-content-center py-8 ${isHistoryVisible ? '' : 'hidden'}`}>
                                        <div className='flex justify-center mb-6'>
                                            <h1 className='font-bold text-2xl'>Riwayat Pembayaran</h1>
                                        </div>
                                        <div className='mb-6'>
                                            {
                                                orderHistory.map((data)=>{
                                                    return (
                                                        <div key={data.id} className='mb-4'>
                                                            <CardPaid picture={data.course.image}
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
                                                                price={data.course.price}
                                                                isPaid={data.status == 'WAITING' ? false : true} 
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            {
                                alertAction ?
                                <div className='relative mb-4 w-[100%] flex justify-center'>
                                        <AllertReset
                                        message={ alertStatus ? 'Update Success' : 'Update Gagal' }
                                        type={alertStatus ? 'success' : 'warning' }
                                />
                                </div>: '' 
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    )
}

export default Account
import { Icon } from '@iconify/react';
import logo from '../../assets/img/color_craftiq.png'
import AnimatedButton from '../Button/AnimatedButton';

const Footer = () => {

    return (
        <div className="w-full bg-DARKGREY01">
            <div className='grid lg:place-content-center'>
                <div className='w-full px-4 lg:px-0 lg:w-[1024px] py-10 text-white'>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className='w-[305.3px] h-[87.7px]'>
                            <img src={logo} className="" />
                        </div>
                        <div className=''>
                            <p className="mb-2 text-sm">The Breeze, Jl. BSD Grand Boulevard, BSD City, Kec. Cisauk, Kab. Tangerang, Banten 15345</p>
                            <p className="mb-2 text-sm">belajar@binar.com</p>
                            <p className='text-sm'>081-233-334-808</p>
                        </div>
                        <div className=''>
                            <p className="text-2xl font-medium">Connect With Us</p>
                            <div className="text-4xl flex gap-4 mt-3">
                                <AnimatedButton>
                                    <div className="bg-white text-DARKBLUE05 flex items-center justify-center w-12 h-12 rounded-[30px]">
                                        <a href="https://facebook.com"><Icon icon="ri:facebook-fill" /></a>
                                    </div>
                                </AnimatedButton>
                                <AnimatedButton>
                                    <div className="bg-white text-DARKBLUE05 flex items-center justify-center w-12 h-12 rounded-[30px]">
                                        <a href="https://x.com"><Icon icon="ri:twitter-x-fill" /></a>
                                    </div>
                                </AnimatedButton>
                                <AnimatedButton>
                                    <div className="bg-white text-DARKBLUE05 flex items-center justify-center w-12 h-12 rounded-[30px]">
                                        <a href="https://instagram.com"><Icon icon="ri:instagram-line" /></a>
                                    </div>
                                </AnimatedButton>
                                <AnimatedButton>
                                    <div className="bg-white text-DARKBLUE05 flex items-center justify-center w-12 h-12 rounded-[30px]">
                                        <a href=""><Icon icon="ic:outline-email" /></a>
                                    </div>
                                </AnimatedButton>
                                <AnimatedButton>
                                    <div className="bg-white text-DARKBLUE05 flex items-center justify-center w-12 h-12 rounded-[30px]">
                                        <a href="https://discord.com"><Icon icon="ic:baseline-discord" /></a>
                                    </div>
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{height: '1px', border: '0', background: 'linear-gradient(to right, #232323, #ffffff, #232323)'}}/>
            <div className='grid lg:place-content-center'>
                <div className='w-full px-4 lg:px-0 lg:w-[1024px] py-4'>
                    <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
                        <div className='flex flex-col gap-2 lg:flex-row lg:gap-10'>
                            <p className='text-white text-xs'>&copy;2023 Binar Academy</p>
                            <p className='text-white text-xs'>Kampus Merdeka Batch 5</p>
                            <p className='text-white text-xs'>Kelompok 2 FSW1 X AND2</p>
                        </div>
                        <div className='border border-white py-1 px-2 rounded-full mt-2.5 lg:mt-0 me-auto lg:me-0'>
                            <p className='text-white text-xs'>All Right Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
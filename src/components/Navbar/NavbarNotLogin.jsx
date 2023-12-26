import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom"

const NavbarNotLogin = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-DARKBLUE05 flex px-20 h-[100px]">
            <button onClick={() => navigate("/")}>
                <h1 className="my-auto w-[125px] h-[30px] text-3xl text-white font-bold">CraftIQ</h1>
            </button>
            <div className="my-auto">
                <div className="bg-white ml-10 w-[526px] h-[62px] rounded-2xl">
                    <div className="py-3 px-6 flex gap-8">
                        <input type="text" className="w-[424px] outline-none border-none" placeholder="Cari Kursus Terbaik.." />
                        <button className="bg-DARKBLUE05 flex items-center justify-center w-[38px] h-[38px] rounded-lg">
                            <Icon icon="bx:search-alt" color="white" className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
            <button className='flex gap-2 items-center justify-center my-auto ml-auto'>
                <Icon icon="ic:round-login" color="white"/>
                <p className='text-white font-medium'>Masuk</p>
            </button>
        </div>
    )
}

export default NavbarNotLogin
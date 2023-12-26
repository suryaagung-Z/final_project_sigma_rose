import { useNavigate } from "react-router-dom"
import cover from "../../assets/img/cover.jpg"
import AnimatedButton from "../Button/AnimatedButton"

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-DARKBLUE05 w-full flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-[884px] h-[300px]">
                <img src={cover} className="w-full h-full object-cover" alt="header" />
                <div className="absolute top-0 right-0 w-full h-full hidden lg:inline" style={{background: 'linear-gradient(270deg, #6148FF 5%, rgba(255, 233, 202, 0) 100%)'}}>
                </div>
                <div className="absolute top-0 right-0 w-full h-full lg:hidden" style={{background: 'linear-gradient(360deg, #6148FF 15%, rgba(255, 233, 202, 0) 100%)'}}>
                </div>
            </div>
            <div className="mx-auto flex flex-col items-center justify-center pb-8 lg:py-0">
                <h1 className="text-white text-2xl font-medium">Belajar <br className="hidden lg:inline"/> dari Praktisi Terbaik!</h1>
                <AnimatedButton>
                    <button onClick={() => navigate("/courses")} className="bg-white mt-4 flex items-center justify-center w-[250px] h-10 rounded-2xl hover:bg-LIGHTBLUE active:bg-LIGHTBLUE">
                        <h1 className="text-DARKBLUE05 text-2xl font-bold">IKUTI KELAS</h1>
                    </button>
                </AnimatedButton>
            </div>
        </div>
    )
}

export default Header
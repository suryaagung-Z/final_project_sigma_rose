import Footer from "../components/Footer/Footer"
import illustration from "../assets/img/illustration.png"

import { useNavigate } from "react-router-dom"

const PaymentSuccess = () => {
    const navigate = useNavigate()

    return (
        <section>
            <div className="bg-white px-10 lg:px-20 py-10 h-full" style={{boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15"}}>
                <div className="flex items-center justify-center">
                    <div className="rounded-xl bg-SUCCESS mt-7 py-3 px-2 w-[800px]">
                        <p className="text-white font-medium text-center">Terimakasih atas pembayaran transaksi anda!</p>
                    </div>
                </div>
            </div>
            <div className="px-20 py-12">
                <div className="flex flex-col items-center justify-center mb-12">
                    <h1 className="text-2xl text-DARKBLUE05 font-bold mb-10">Selamat!</h1>
                    <img src={illustration} alt="" className="mb-10" />
                    <div className="mb-12">
                        <p className="font-semibold mb-2 text-center">Transaksi pembayaran kelas premium berhasil!</p>
                        <p className="text-center">E-receipt telah dikirimkan ke email.</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <button onClick={() => navigate("/courses/detail/unlock")} className="bg-DARKBLUE05 rounded-full py-4 w-80 mb-4">
                            <p className="text-white font-medium text-center">Mulai Belajar</p>
                        </button>
                        <button onClick={() => navigate("/")}>
                            <p className="text-DARKBLUE03 font-medium">Kembali ke Beranda</p>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default PaymentSuccess
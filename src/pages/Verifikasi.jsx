import VerifikasiOtp from'../components/ResetPassword/VerifikasiOtp'
const Verifikasi = () => {
    return(
    <section className="mx-auto">
      <div className="grid grid-cols-12 ">
        <div className="col-span-7 my-auto  px-40">
      <VerifikasiOtp />
        </div>
        <div className="col-span-5 bg-DARKBLUE05 h-screen"></div>
      </div>
    </section>
    )
}
export default Verifikasi

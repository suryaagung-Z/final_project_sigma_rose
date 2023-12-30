import ButtonReset from "../Button/ButtonReset";
import { useRef, useState , useEffect } from "react";
import TitleReset from "../InputPassword/TitleReset";
import AllertReset from "../Allert/AllertReset";
import { consumeUserApi } from "../../api/user";
const Tautan = () => {

  const [alertStatus, setAlertStatus] = useState(false);
  const [alertAction, setAlertAction] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");


  useEffect(() => {
    setAlertTime();
  });

  const setAlertTime = () => {
    if (alertAction) {
      setTimeout(() => {
        setAlertAction(false);
      }, 5000);
    }
  };


  const ipMail = useRef(null);
  const sendMail = () => {
    const email = ipMail.current.value;
    console.log(email)
    consumeUserApi.resetPassword({email : email}).then(res => {
      if(res.status == 'OK'){
          setAlertAction(true)
          setAlertStatus(true)
          setAlertMsg('Buka Email Anda untuk Tautan Reset')
      }else if( res.response.data.status == 'FAIL' && res.response.data.message == 'Reset Password Link has been sent' ){
        setAlertAction(true)
        setAlertStatus(false)
        setAlertMsg('Tautan Sudah Terkirim , Check dan Coba lagi nanti')
      }
      else{
        setAlertAction(true)
        setAlertStatus(false)
        setAlertMsg('Email Tidak Valid')
      }
    })

  };
  
  return (
    <section className="relative">
      <div>  
        <TitleReset titleMessage={"Reset Password"} />
        <div className="pb-4 ">
          <label className="text-sm/[6px] font-normal pb-1.5">
            Masukan Email Untuk Menerima Tautan
          </label>
          <input
            type="email"
            className="border-2 border-neutral-200 text-sm rounded-2xl px-4 py-3 w-full"
            ref={ipMail}
            required
          />
        </div>
          <ButtonReset className="w-full" title={"Kirim"} onClick={sendMail}></ButtonReset>
        <div className={` ml-LEFTWR mt-8 `}>
        {alertAction ? (
          <div className="relative mt-[40px] ">
            <AllertReset
              message={alertMsg}
              type={alertStatus ? "success" : "warning"}
            />
          </div>
        ) : (
          ""
        )}
        </div>
      </div>
    </section>
  );
};
export default Tautan;

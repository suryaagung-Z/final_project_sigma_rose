import { Navigate, Outlet } from "react-router-dom";
import getCookieValue from "../api/getCookie";

const PrivateRoutes = () => {
    const token = getCookieValue("token");
    if (token === null) {
        return <Navigate to="/login" />
    } else {
        return <Outlet/>
    }
}

export default PrivateRoutes;
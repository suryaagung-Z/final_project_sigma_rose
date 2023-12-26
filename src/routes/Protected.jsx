import { Navigate, Outlet } from "react-router-dom";
import getCookieValue from "../api/getCookie";
const ProtectedRoutes = () => {
    const token = getCookieValue("token");
    if (token === null) {
        return <Outlet/>
    } else {
        return <Navigate to="/dashboard" />
    }
}

export default ProtectedRoutes;
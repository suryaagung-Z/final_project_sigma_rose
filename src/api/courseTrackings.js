const BASH_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import axios from 'axios'
import getCookieValue from './getCookie';
const tokenCookie = getCookieValue("token")

export const consumeCourseTrackingsApi = {
    getCourseTrackingsByUser : async () => {
        try {
            const res = await axios.get(`${BASH_URL}/courseTrackings/user`, {
                headers: {
                    'Authorization': `Bearer ${tokenCookie}`,
                    'Content-Type': 'application/json',
                }
            });
    
            return res.data;
        } catch (error) {
            return error
        }
    },
    getCourseTrackings : async () => {
        try {
            const res = await axios.get(`${BASH_URL}/courseTrackings`, {
                headers: {
                    'Authorization': `Bearer ${tokenCookie}`,
                    'Content-Type': 'application/json',
                }
            });
    
            return res.data;
        } catch (error) {
            return error
        }
    },
    createCourseTrackingsUser : async (payload) => {
        try {
            const res = await axios.post(`${BASH_URL}/courseTrackings`, payload, {
                headers: {
                    'Authorization': `Bearer ${tokenCookie}`,
                    'Content-Type': 'application/json',
                }
            });
    
            return res.data;
        } catch (error) {
            return error
        }
    },
    updateCourseTrackingsUser : async (payload) => {
        try {
            const res = await axios.put(`${BASH_URL}/courseTrackings`, payload, {
                headers: {
                    'Authorization': `Bearer ${tokenCookie}`,
                    'Content-Type': 'application/json',
                }
            });
    
            return res.data;
        } catch (error) {
            return error
        }
    },
}
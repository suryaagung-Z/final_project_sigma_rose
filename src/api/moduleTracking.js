const BASH_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import axios from 'axios'
import getCookieValue from './getCookie';
const tokenCookie = getCookieValue("token")

export const consumeModuleTrackingsApi = {
    getModuleTrackings : async () => {
        try {
            const res = await axios.get(`${BASH_URL}/moduleTrackings`, {
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
    getModuleTrackingsByUser : async () => {
        try {
            const res = await axios.get(`${BASH_URL}/moduleTrackings/user`, {
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
    getModuleTrackingsByUserTrack : async (payload) => {
        try {
            const res = await axios.post(`${BASH_URL}/moduleTrackings/userTrack`, payload ,{
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
    createModuleTrackingsUser : async (payload) => {
        try {
            const res = await axios.post(`${BASH_URL}/moduleTrackings`, payload, {
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
    updateModuleTrackingsUser : async (payload) => {
        try {
            const res = await axios.put(`${BASH_URL}/moduleTrackings`, payload, {
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
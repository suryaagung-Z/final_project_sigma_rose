const BASH_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import axios from 'axios'
import getCookieValue from './getCookie';
const tokenCookie = getCookieValue("token")

export const consumeOrderApi = {
    getOrderUser : async () => {
        try {
            const res = await axios.get(`${BASH_URL}/orders/user`, {
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

    createOrderUser : async (payload) => {
        try {
            const res = await axios.post(`${BASH_URL}/orders`,payload ,{
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
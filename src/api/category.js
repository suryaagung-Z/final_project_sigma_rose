const BASH_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import axios from 'axios'


export const consumeCategoriesApi = {
    getCategories : async () => {
        try {
            const res = await axios.get(`${BASH_URL}/categories`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            return res.data;
        } catch (error) {
            return error
        }
    },
}
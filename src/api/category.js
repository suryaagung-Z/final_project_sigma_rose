const BASH_URL = "https://binar-project-production.up.railway.app";
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
import axios from "axios";

const url = ''


export const getEventDetails =  async() => {
    const token = ''
    return await axios.get(`${url}/events-details`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
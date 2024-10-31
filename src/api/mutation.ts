import axios from "axios";

const url = ' '
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAccount = async (data: any) => {
    return await axios.post('/create-account', data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAccount = async (data: any) => {
    return await axios.post(`${url}/login-account`, data)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEvent = async (data: any) => {
    return await axios.post(`${url}/create-event`, data)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadPictures = async (data: any) => {
    return await axios.post(`${url}/upload`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const sendInviteLink = async ({ emails, guestLink }: { emails: string[]; guestLink: string }) => {
    return await axios.post(`${url}/create-event`, {emails, guestLink})
}
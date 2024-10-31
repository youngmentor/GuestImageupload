import { createHashRouter } from "react-router-dom";
import SignupForm from "./onboarding/create-account";
import LoginForm from "./onboarding/login";
import GuestUpload from "./guestPanel/upload";

export const routes =  createHashRouter([
    {
        path: '',
        element: <SignupForm/>
    },
    {
        path: '/login',
        element: <LoginForm/>
    },
    {
        path: '/upload',
        element: <GuestUpload/>
    },
])
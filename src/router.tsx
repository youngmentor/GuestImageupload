import { createHashRouter } from "react-router-dom";
import SignupForm from "./onboarding/create-account";
import LoginForm from "./onboarding/login";
import GuestUpload from "./guestPanel/upload";
import Dashboard from "./adminPanel";
import CreateEvent from "./adminPanel/create-event";
import AdminDashboard from "./adminPanel/overview";

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
    {
        path: '/hostPanel',
        element: <Dashboard/>,
        children: [
            {
                path: '',
                element: <AdminDashboard/>
            },
            {
                path: '/hostPanel/create-event',
                element: <CreateEvent/>
            },
        ]
    },
])
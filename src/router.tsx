import { createHashRouter } from "react-router-dom";
import SignupForm from "./onboarding/create-account";
import LoginForm from "./onboarding/login";
import GuestUpload from "./guestPanel/upload";
import Dashboard from "./adminPanel";
import CreateEvent from "./adminPanel/create-event";
import AdminDashboard from "./adminPanel/overview";
import SendLinkToGuests from "./adminPanel/shareLinkToEmail";
import EventsList from "./adminPanel/event/eventList";
import EventDetails from "./adminPanel/event/eventDetails";

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
            {
                path: '/hostPanel/share-link',
                element: <SendLinkToGuests/>
            },
            {
                path: '/hostPanel/events',
                element: <EventsList/>
            },
            {
                path: '/hostPanel/events/:id',
                element: <EventDetails/>
            },
        ]
    },
])
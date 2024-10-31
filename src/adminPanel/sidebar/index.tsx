import { useNavigate } from "react-router-dom"

const SideBar

    = () => {
        const navigate = useNavigate()
        return (
            <div className="w-full h-full border border-r-[lightgrey] flex items-center flex-col justify-center">
                <div className="w-full h-[80%] flex items-center flex-col gap-[20px]">
                <span className="w-[90%]" onClick={()=> navigate('/hostPanel')}>
                    <p>Dashboard</p>
                </span>
                <span className="w-[90%]" onClick={()=> navigate('/hostPanel/create-event')}>
                    <p>Create Event</p>
                </span>
                <span className="w-[90%]" onClick={()=> navigate('/hostPanel/share-link')}>
                    <p>Share Invitation Link</p>
                </span>
                <span className="w-[90%]" onClick={()=> navigate('/hostPanel/events')}>
                    <p>Events</p>
                </span>
                </div>
            </div>
        )
    }

export default SideBar

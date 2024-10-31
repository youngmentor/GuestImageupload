import { useNavigate } from "react-router-dom"

const SideBar

    = () => {
        const navigate = useNavigate()
        return (
            <div className="w-full h-full border border-r-[lightgrey] flex items-center flex-col justify-center">
                <div className="w-full h-[50%] flex items-center flex-col gap-[20px]">
                <span onClick={()=> navigate('/hostPanel')}>
                    <p>Dashboard</p>
                </span>
                <span onClick={()=> navigate('/hostPanel/create-event')}>
                    <p>Create Event</p>
                </span>
                </div>
            </div>
        )
    }

export default SideBar

import { Outlet } from "react-router-dom"
import SideBar from "./sidebar"

const Dashboard = () => {
    return (
        <div className="w-[100%] h-[100vh] flex  p-0">
                <div className="w-[15%] h-[100%]">
                    <SideBar />
                </div>
                <div className="w-[85%] h-[100%] flex items-center justify-center">
                    <Outlet />
                </div>
        </div>
    )
}

export default Dashboard
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


export default function DashboardLayout() {

    return (
        <>
  
        <div className="dashboard-layout-container">
             <SideBar />
             <Outlet />
        </div>
        </>
    );
}
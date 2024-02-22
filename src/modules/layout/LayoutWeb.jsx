import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import './web-layout.scss'
import { useContext } from "react";
import UserContext from "../../context/use.context";
import Sidebar from "../components/sidebar/sidebar.admin";
import CONFIG_ADMIN from "../../lib/configs/sidebarNav";
function LayoutWeb() {
    const [userCtx] = useContext(UserContext)
    return (
        <div className="layout">
            <Header />
            <div className="main">
                <div className="main__sidebar">
                    <Sidebar sidebarNav={CONFIG_ADMIN.sidebarNav} />
                </div>
                <div className="main__outlet">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default LayoutWeb
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

    return (
        <>
            <UserNavbar />
            <Outlet />

            <Footer />
        </>
    );
}

export default DashboardLayout;
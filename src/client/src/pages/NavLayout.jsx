import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function NavLayout({ children, hasFullyNavbar = false }) {
    return (
        <>
            { hasFullyNavbar ? <Navbar /> : <Navbar logoOnly={true}/>}
            <Outlet/>
        </>
    );
}

export default NavLayout;

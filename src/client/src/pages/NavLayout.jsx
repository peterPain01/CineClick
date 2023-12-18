import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export function FullyNavLayout({ children }) {
    return (
        <>
            <Navbar logoOnly={false} />
            {children}
        </>
    );
}

export function NavLayout({ children }) {
    return (
        <>
            <Navbar logoOnly={true}/>
            {children}
        </>
    );
}

import "./App.css";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profiles from "./pages/Profiles/Profiles";
import Payment from "./pages/Payment/Payment";
import Account from "./pages/Account/Account";
import Missing from "./pages/Missing/Missing";
import CheckOut from "./pages/CheckOut/CheckOut";

import TVShow from "./pages/TVShow/TVShow";
import Movies from "./pages/Movies/Movies";
import Cart from "./pages/Cart/Cart";
import Browse from "./pages/Browse/Browse";
import NavLayout from "./pages/NavLayout";

import {
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import { useEffect } from "react";

function App() {
    const titles = {
        "/": "Home",
        "/tvshow": "TVShow",
        "/movies": "Movies",
        "/browse": "Browse",
        "/login": "Login",
        "/register": "Register",
        "/checkout": "Checkout",
        "/cart": "Cart",
        "/topup": "TopUp",
        "/profiles": "Profile",
        "/YourAccount": "Account",
    };

    const location = useLocation();
    useEffect(() => {
        document.title = (titles[location.pathname] ?? "Missing") + " - Netflix";
    }, [location]);
    
    return (
        <>
            <Routes>
                <Route element={<NavLayout hasFullyNavbar={false} />}>
                    <Route path="/login" element={<Auth />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    
                    <Route path="/payment" element={<Payment />}></Route>
                    <Route path="/checkout" element={<CheckOut />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/topup" element={<Cart />}></Route>

                    <Route path="/profiles" element={<Profiles />}></Route>
                    <Route path="/YourAccount" element={<Account />}></Route>
                </Route>

                <Route element={<NavLayout hasFullyNavbar={true} />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/tvshow" element={<TVShow />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                    <Route path="/browse" element={<Browse />}></Route>
                </Route>

                <Route path="*" element={<Missing />}></Route>
            </Routes>
        </>
    );
}

export default App;

import "./App.css";

import { publicRoutes } from "@/routers";

import { Routes, Route, useLocation } from "react-router-dom";

import { Fragment, useEffect } from "react";

import {NavLayout, FullyNavLayout} from "@/pages/NavLayout";

import {useCookies} from "react-cookie";

import {Auth} from "./pages/Auth/Auth";
import { Register } from "./pages/Register/Register";

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
        document.title =
            (titles[location.pathname] ?? "Missing") + " - Netflix";
    }, [location]);

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    if (cookies.login == undefined) {
        // TODO: fetch user
        setCookie("login", false, {
            expires: false,
        });
        console.log("OK");
    }

    return (
        <>
            {cookies.login ?
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = NavLayout;
                    if (route.layout === null) {
                        Layout = Fragment;
                    } else if (route.layout) {
                        Layout = route.layout;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
                :
            <Routes>
                <Route path="*" Component={Auth}></Route>
                <Route path="/register" Component={Register}></Route>
            </Routes>
            }
        </>
    );
}

export default App;

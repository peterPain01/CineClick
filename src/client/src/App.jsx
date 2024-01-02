import "./App.css";

import { viewerRoutes, adminRoutes } from "@/routers";

import { Routes, Route, useLocation } from "react-router-dom";

import { Fragment, useEffect } from "react";

import { NavLayout, FullyNavLayout } from "@/pages/NavLayout";
import AdminLayout from "@/pages/AdminLayout";

import { useCookies } from "react-cookie";

import { Auth } from "./pages/Auth/Auth";
import { Register } from "./pages/Register/Register";
import Recover from "./pages/Recover/Recover";
import ResetPassword from "./pages/ResetPassword/ResetPassword"; 

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
        "/recover": "Recover",
    };

    const location = useLocation();
    useEffect(() => {
        document.title =
            (titles[location.pathname] ?? "Missing") + " - Netflix";
    }, [location]);

    const [cookies, setCookie, removeCookie] = useCookies(["login"]);

    return (
        <>
            {cookies.login ? (
                <>
                    {cookies?.login?.type?.endsWith("-viewer") ? (
                        <Routes>
                            {viewerRoutes.map((route, index) => {
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
                    ) : (
                        <Routes>
                            {adminRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = AdminLayout;
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
                    )}{" "}
                </>
            ) : (
                <Routes>
                    <Route
                        path="*"
                        element={
                            <NavLayout>
                                <Auth />
                            </NavLayout>
                        }
                    ></Route>
                    <Route
                        path="/recover"
                        element={
                            <NavLayout>
                                <Recover />
                            </NavLayout>
                        }
                    />
                    <Route
                        path="/reset-password/:email/:token"
                        element={
                            <NavLayout>
                                <ResetPassword />
                            </NavLayout>
                        }
                    ></Route>
                    <Route
                        path="/register"
                        element={
                            <NavLayout>
                                <Register />
                            </NavLayout>
                        }
                    ></Route>
                </Routes>
            )}
        </>
    );
}

export default App;

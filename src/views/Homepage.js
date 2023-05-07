import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const accessTokenExp = localStorage.getItem("access_token_exp");
        const userToken = localStorage.getItem("user");
        if (accessToken && accessTokenExp && userToken && refreshToken) {
            setUser(JSON.parse(userToken));
            if (accessTokenExp < Date.now() / 1000) {
                localStorage.clear();
                navigate("/");
            }
        } else {
            localStorage.clear();
            navigate("/");
        }
    }, []);
    return (
        <>
            <header>
                <NavBar user={user} />
                <Hero />
            </header>
            <main>
                <Main />
            </main>
            <Footer />
        </>
    );
};

export default Homepage;

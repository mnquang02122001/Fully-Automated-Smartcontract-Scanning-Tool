import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            if (!decoded.exp || decoded.exp < Date.now() / 1000) {
                localStorage.clear();
                navigate("/");
            }
            setUser(decoded);
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

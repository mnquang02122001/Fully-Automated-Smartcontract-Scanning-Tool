import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ScanSummary from "../components/ScanSummary";
import ScanTable from "../components/ScanTable";
const ScanResult = () => {
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
        if (
            !localStorage.getItem("scan_summary") ||
            !localStorage.getItem("vul_summary")
        ) {
            navigate("/homepage");
        }
    }, []);
    return (
        <>
            <NavBar user={user} />
            <Container className="my-4 px-4">
                <ScanSummary />
                <ScanTable />
            </Container>
            <Footer />
        </>
    );
};

export default ScanResult;

import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const handleSuccess = async (response) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/auth/login/google`,
                {
                    access_token: response.credential,
                }
            );
            console.log(res.data);
            if (res.data.status === "success") {
                localStorage.setItem(
                    "access_token",
                    res.data.data.access_token
                );
                localStorage.setItem(
                    "access_token_exp",
                    res.data.data.access_token_exp
                );
                localStorage.setItem(
                    "refresh_token",
                    res.data.data.refresh_token
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.data.user_info)
                );
                navigate("/homepage");
            }
        } catch (err) {
            alert("Login failed");
        }
    };
    const handleFailure = () => {
        alert("Login failed");
    };
    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
            type="icon"
            shape="circle"
            useOneTap
        />
    );
};

export default GoogleLoginButton;

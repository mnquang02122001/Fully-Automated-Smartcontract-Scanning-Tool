import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const handleSuccess = (response) => {
        localStorage.setItem("token", response.credential);
        navigate("/homepage");
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
        />
    );
};

export default GoogleLoginButton;

import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import GoogleLoginButton from "../components/GoogleLoginButton";
import Spinner from "react-bootstrap/Spinner";
import MyToast from "../components/MyToast";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const LoginPage = () => {
    const [showToast, setShowToast] = useState({
        open: false,
        vertical: "top",
        horizontal: "right",
    });
    const handleShowToast = (newShowToast) => {
        setShowToast({ open: true, ...newShowToast });
    };
    const handleCloseToast = () => {
        setShowToast({ ...showToast, open: false });
    };
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         navigate("/homepage");
    //     }
    // }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [loading, setLoading] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleShowToast({ vertical: "top", horizontal: "right" });
        //setLoading(true);
        // Call backend API to check if user exists
        // After call API set loading to false
        //navigate('/homepage');
    };
    return (
        <MDBContainer
            fluid
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "#508BFC",
            }}
        >
            <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol col="12">
                    <MDBCard
                        className="bg-white my-5 mx-auto"
                        style={{ borderRadius: "1rem", maxWidth: "500px" }}
                    >
                        <form onSubmit={handleSubmit}>
                            <MDBCardBody className="p-5 w-100 d-flex flex-column">
                                <h2 className="fw-bold mb-2 text-center">
                                    Sign in
                                </h2>
                                <div className="d-flex justify-content-center py-3">
                                    <img
                                        src={logo}
                                        height="45"
                                        width="45"
                                        alt="Logo"
                                        loading="lazy"
                                    />
                                </div>
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    label="Email address"
                                    id="emailFormControl"
                                    type="email"
                                    size="lg"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    label="Password"
                                    id="passwordFormControl"
                                    type="password"
                                    size="lg"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <div className="d-flex justify-content-between mb-4">
                                    <MDBCheckbox
                                        name="flexCheck"
                                        value=""
                                        id="flexCheckDefault"
                                        label="Remember me"
                                    />
                                    <Link to="/">Forgot password?</Link>
                                </div>
                                <MDBBtn size="lg" className="mb-3">
                                    Login
                                </MDBBtn>
                                <div className="text-center mb-1">
                                    <span>Not a member?</span>
                                    <Link to="/"> Register</Link>
                                </div>

                                {/* {loading && (
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )} */}
                                <hr className="mb-3" />
                                <MDBCol className="d-flex justify-content-center align-items-center">
                                    <p className="text-center my-0 mx-2">
                                        Or login with
                                    </p>
                                    <GoogleLoginButton className="ml-5" />
                                </MDBCol>
                            </MDBCardBody>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MyToast
                {...showToast}
                handleClose={handleCloseToast}
                message="Invalid email or password!"
                severity="error"
            />
        </MDBContainer>
    );
};

export default LoginPage;

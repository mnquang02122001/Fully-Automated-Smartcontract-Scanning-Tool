import React, { useState, useEffect } from "react";
import { MDBSpinner } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MyToast from "./MyToast";
import iconScan from "../assets/images/scan.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ScanInput = () => {
    const [platforms, setPlatforms] = useState([]);
    const [network, setNetwork] = useState("Ethereum");
    const [address, setAddress] = useState("");
    const [isSuccess, setIsSuccess] = useState({
        success: true,
    });
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState({
        open: false,
        vertical: "top",
        horizontal: "right",
        severity: "success",
        message: "Scan successfully",
    });
    useEffect(() => {
        const getPlatforms = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/resources/platform`
                );
                setPlatforms(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPlatforms();
    }, []);
    const navigate = useNavigate();
    const handleShowToast = (newShowToast) => {
        setShowToast({ open: true, ...newShowToast });
    };
    const handleCloseToast = () => {
        setShowToast({ ...showToast, open: false });
    };
    const handleSelectNetwork = (e) => {
        setNetwork(e.target.value);
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentPlatform = platforms.find(
            (platform) => platform.name === network
        );
        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/contract/scan`,
                {
                    address: address.trim(),
                    platform_id: currentPlatform.id,
                    is_public: "True",
                    email: "mnquang123@gmail.com",
                }
            );

            if (res.data.status === "success") {
                setIsSuccess({ success: true });
                const interval = setInterval(async () => {
                    try {
                        const scan = await axios.get(
                            `${process.env.REACT_APP_SERVER_URL}/api/contract/${currentPlatform.id}/${address}`
                        );

                        const vul = await axios.get(
                            `${process.env.REACT_APP_SERVER_URL}/api/contract/${currentPlatform.id}/${address}/vulnerability/:page/:size`
                        );
                        if (
                            scan.data.data &&
                            scan.data.data.scan.status.toLowerCase() ===
                                "completed"
                        ) {
                            localStorage.setItem(
                                "scan_summary",
                                JSON.stringify(scan.data.data)
                            );
                            localStorage.setItem(
                                "vul_summary",
                                JSON.stringify(vul.data.data)
                            );
                            navigate("/scan-result");
                            handleShowToast({
                                vertical: "top",
                                horizontal: "right",
                                severity: "success",
                                message: "Scan successfully",
                            });
                            clearInterval(interval);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }, 5000);
                return () => clearInterval(interval);
            } else {
                setIsSuccess({ success: false });
                handleShowToast({
                    vertical: "top",
                    horizontal: "right",
                    severity: "error",
                    message: "Smart contract is invalid or unavailable!",
                });
                localStorage.removeItem("scan_summary");
                localStorage.removeItem("vul_summary");
            }
        } catch (err) {
            console.log(err);
            setIsSuccess({ success: false });
            handleShowToast({
                vertical: "top",
                horizontal: "right",
                severity: "error",
                message: "Smart contract is invalid or unavailable!",
            });
            localStorage.removeItem("scan_summary");
            localStorage.removeItem("vul_summary");
        }
        setLoading(false);
        // setNetwork("Ethereum");
        // setAddress("");
    };
    return (
        <div className="d-flex lg:w-2/5">
            <Form.Select
                aria-label="Default select example"
                className="py-3 shadow-none"
                style={{
                    width: "50%",
                    borderRadius: "10px 0 0 10px",
                }}
                value={network}
                onChange={handleSelectNetwork}
            >
                {platforms.map((platform) => (
                    <option key={platform.id}>{platform.name}</option>
                ))}
            </Form.Select>
            <Form.Control
                type="text"
                placeholder="Enter a smart contract address"
                style={{
                    borderRadius: "0",
                }}
                className="shadow-none bg-light"
                value={address}
                onChange={handleAddress}
            />
            <Button
                className="bg-light shadow-none px-2"
                style={{
                    borderRadius: "0 10px 10px 0",
                    border: "1px solid #bdbdbc",
                }}
                onClick={handleSubmit}
            >
                {loading ? (
                    <MDBSpinner color="primary" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                ) : (
                    <img src={iconScan} alt="icon-scan" height="25" />
                )}
            </Button>
            <MyToast {...showToast} handleClose={handleCloseToast} />
        </div>
    );
};

export default ScanInput;

import React, { useState } from "react";
import JsPDF from "jspdf";
import { MDBBtn } from "mdb-react-ui-kit";
import MyToast from "./MyToast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
const ExportButton = () => {
    const [showToast, setShowToast] = useState({
        open: false,
        vertical: "top",
        horizontal: "right",
        severity: "success",
        message: "Export successfully",
    });
    const handleShowToast = (newShowToast) => {
        setShowToast({ open: true, ...newShowToast });
    };
    const handleCloseToast = () => {
        setShowToast({ ...showToast, open: false });
    };
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setExecutiveSummary("");
        setAssessmentAndScope("");
    };
    const handleShow = () => setShow(true);
    const [executiveSummary, setExecutiveSummary] = useState("");
    const [assessmentAndScope, setAssessmentAndScope] = useState("");
    const handleExport = async () => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const address = JSON.parse(
            localStorage.getItem("scan_summary")
        ).address;
        const platformId = JSON.parse(localStorage.getItem("scan_summary"))
            .platform.id;
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/report/generate`,
                {
                    executive_summary: executiveSummary,
                    assesment_and_scope: assessmentAndScope,
                    platform_id: platformId,
                    address: address,
                },
                {
                    headers: {
                        authorization: refreshToken,
                        "x-access-token": accessToken,
                    },
                }
            );
            console.log(res.data);
            if (res.data.status === "success") {
                try {
                    const report = await axios.get(
                        `${process.env.REACT_APP_SERVER_URL}/api/report/view/${platformId}/${address}`,
                        {
                            headers: {
                                authorization: refreshToken,
                                "x-access-token": accessToken,
                            },
                        }
                    );
                    if (report.data.status === "success") {
                        window.location.href = report.data.data;
                        handleClose();
                        handleShowToast({
                            vertical: "top",
                            horizontal: "right",
                            severity: "success",
                            message: "Export successfully",
                        });
                    } else {
                        handleClose();
                        handleShowToast({
                            vertical: "top",
                            horizontal: "right",
                            severity: "error",
                            message: "Fail to export report",
                        });
                    }
                } catch (err) {
                    console.log(err);
                    handleClose();
                    handleShowToast({
                        vertical: "top",
                        horizontal: "right",
                        severity: "error",
                        message: "Fail to export report",
                    });
                }
            } else {
                handleClose();
                handleShowToast({
                    vertical: "top",
                    horizontal: "right",
                    severity: "error",
                    message: "Fail to export report",
                });
            }
        } catch (err) {
            console.log(err);
            handleClose();
            handleShowToast({
                vertical: "top",
                horizontal: "right",
                severity: "error",
                message: "Fail to export report",
            });
        }
    };
    // const generatePDF = () => {
    //   const report = new JsPDF('landscape', 'pt');
    //   report.html(document.querySelector('#scan-table'), {
    //     callback: function (pdf) {
    //       pdf.save('scan-report.pdf');
    //     },
    //   });
    //   handleShowToast({ vertical: 'top', horizontal: 'right' });
    // };
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="ms-2">
                Export Report
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Smart contract information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Executive summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={7}
                                value={executiveSummary}
                                onChange={(e) =>
                                    setExecutiveSummary(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Assessment and scope</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={7}
                                value={assessmentAndScope}
                                onChange={(e) =>
                                    setAssessmentAndScope(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleExport}>
                        Export
                    </Button>
                </Modal.Footer>
            </Modal>
            <MyToast {...showToast} handleClose={handleCloseToast} />
        </>
    );
};

export default ExportButton;

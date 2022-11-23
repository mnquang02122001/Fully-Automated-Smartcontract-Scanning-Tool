import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import MyToast from './MyToast';
import badge2 from '../assets/images/badge2.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function BadgeModal() {
  const [gridModal, setGridModal] = useState(false);

  const toggleShow = () => setGridModal(!gridModal);

  const [showToast, setShowToast] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const handleShowToast = (newShowToast) => {
    setShowToast({ open: true, ...newShowToast });
  };
  const handleCloseToast = () => {
    setShowToast({ ...showToast, open: false });
  };
  return (
    <>
      <MDBBtn onClick={toggleShow}>Add Badge</MDBBtn>

      <MDBModal tabIndex="-1" show={gridModal} setShow={setGridModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="fs-2">Add Badge</MDBModalTitle>
              <MDBBtn
                type="button"
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="d-flex justify-content-center mb-3">
                <img src={badge2} alt="badge" />
              </div>
              <p>
                Adding the snippet below to your HTML code will help you show
                the badge scanned by CrowChain.
              </p>
              <SyntaxHighlighter language="html" style={vs2015}>
                {`<a href="http://localhost:3000" target="_blank">
    <img src="badge" alt="Crowchain badge"/>
</a>`}
              </SyntaxHighlighter>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="tertiary" onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  navigator.clipboard
                    .writeText(`<a href="http://localhost:3000" target="_blank">
    <img src="badge" alt="Crowchain badge"/>
</a>`);
                  toggleShow();
                  handleShowToast({ vertical: 'top', horizontal: 'right' });
                }}
              >
                Copy
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MyToast
        {...showToast}
        handleClose={handleCloseToast}
        message="Copied!"
        severity="success"
      />
    </>
  );
}

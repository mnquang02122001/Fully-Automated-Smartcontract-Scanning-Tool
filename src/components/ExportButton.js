import React, { useState } from 'react';
import JsPDF from 'jspdf';
import { MDBBtn } from 'mdb-react-ui-kit';
import MyToast from './MyToast';
const ExportButton = () => {
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
  const generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');
    report.html(document.querySelector('#scan-table'), {
      callback: function (pdf) {
        pdf.save('scan-report.pdf');
      },
    });
    handleShowToast({ vertical: 'top', horizontal: 'right' });
  };
  return (
    <>
      <MDBBtn className="ms-2" onClick={generatePDF}>
        Export report
      </MDBBtn>
      <MyToast
        {...showToast}
        handleClose={handleCloseToast}
        message="Exported successfully"
        severity="success"
      />
    </>
  );
};

export default ExportButton;

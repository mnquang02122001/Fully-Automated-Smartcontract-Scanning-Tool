import React, { useState } from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MyToast from '../components/MyToast';
import iconScan from '../assets/images/scan.svg';
const ScanInput = () => {
  const [network, setNetwork] = useState('Ethereum');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
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
  const handleSelectNetwork = (e) => {
    setNetwork(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    //call API
    handleShowToast({ vertical: 'top', horizontal: 'right' });
    setNetwork('Ethereum');
    setAddress('');
    console.log(network, address);
  };
  return (
    <div className="d-flex lg:w-2/5">
      <Form.Select
        aria-label="Default select example"
        className="py-3 shadow-none"
        style={{
          width: '140px',
          borderRadius: '10px 0 0 10px',
        }}
        value={network}
        onChange={handleSelectNetwork}
      >
        <option>Ethereum</option>
        <option>Goerli</option>
        <option>Sepolia</option>
        <option>BSC</option>
        <option>BSC Testnet</option>
        <option>Polygon</option>
        <option>Mumbai</option>
        <option>Arbitrum</option>
        <option>Arbi Testnet</option>
        <option>Avalanche</option>
        <option>FTM</option>
        <option>FTM Testnet</option>
      </Form.Select>
      <Form.Control
        type="text"
        placeholder="Enter a smart contract address"
        style={{
          borderRadius: '0',
        }}
        className="shadow-none bg-light"
        value={address}
        onChange={handleAddress}
      />
      <Button
        className="bg-light shadow-none px-2"
        style={{
          borderRadius: '0 10px 10px 0',
          border: '1px solid #bdbdbc',
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
      <MyToast
        {...showToast}
        handleClose={handleCloseToast}
        message="Invalid smart contract"
      />
    </div>
  );
};

export default ScanInput;

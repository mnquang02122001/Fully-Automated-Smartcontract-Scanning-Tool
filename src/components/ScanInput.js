import React, { useState } from 'react';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
const ScanInput = () => {
  const [network, setNetwork] = useState('Ethereum');
  const [address, setAddress] = useState('');

  return (
    <div className="d-flex lg:w-2/5">
      <MDBDropdown group style={{ zIndex: '100' }}>
        <MDBDropdownToggle color="dark">Action</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Action</MDBDropdownItem>
          <MDBDropdownItem link>Another action</MDBDropdownItem>
          <MDBDropdownItem link>Something else here</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};

export default ScanInput;

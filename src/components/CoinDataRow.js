import React from 'react';

const CoinDataRow = () => {
  return (
    <tr>
      <th scope="col">Percentage change</th>
      <td className="text-danger">
        <MDBIcon className="me-1" fas icon="caret-down" />
        -48.8%
      </td>
      <td className="text-success">
        <MDBIcon className="me-1" fas icon="caret-up" />
        14.0%
      </td>
      <td className="text-success">
        <MDBIcon className="me-1" fas icon="caret-up" />
        46.4%
      </td>
      <td className="text-success">
        <MDBIcon className="me-1" fas icon="caret-up" />
        29.6%
      </td>
      <td className="text-danger">
        <MDBIcon className="me-1" fas icon="caret-down" />
        -11.5%
      </td>
    </tr>
  );
};

export default CoinDataRow;

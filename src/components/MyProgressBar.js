import React from 'react';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
const MyProgressBar = ({ vulOverview }) => {
  const data = vulOverview
    ? [
        vulOverview.critical,
        vulOverview.high,
        vulOverview.medium,
        vulOverview.low,
        vulOverview.information,
      ]
    : [0, 0, 0, 0, 0];
  const total = data.reduce((a, b) => a + b, 0);
  return (
    <>
      <div>
        <div style={{ fontSize: '0.9rem' }}>
          <span>Critical</span>
          <span className="float-end">{data[0]}</span>
        </div>
        <MDBProgress height="10" style={{ borderRadius: '0.5rem' }}>
          <MDBProgressBar
            style={{ backgroundColor: '#550808' }}
            width={(data[0] / total) * 100}
            valuemin={0}
            valuemax={total}
          />
        </MDBProgress>
      </div>

      <div>
        <div style={{ fontSize: '0.9rem' }}>
          <span>High</span>
          <span className="float-end">{data[1]}</span>
        </div>
        <MDBProgress height="10" style={{ borderRadius: '0.5rem' }}>
          <MDBProgressBar
            style={{ backgroundColor: '#ec672c' }}
            width={(data[1] / total) * 100}
            valuemin={0}
            valuemax={total}
          />
        </MDBProgress>
      </div>

      <div>
        <div style={{ fontSize: '0.9rem' }}>
          <span>Medium</span>
          <span className="float-end">{data[2]}</span>
        </div>
        <MDBProgress height="10" style={{ borderRadius: '0.5rem' }}>
          <MDBProgressBar
            style={{ backgroundColor: '#add832' }}
            width={(data[2] / total) * 100}
            valuemin={0}
            valuemax={total}
          />
        </MDBProgress>
      </div>

      <div>
        <div style={{ fontSize: '0.9rem' }}>
          <span>Low</span>
          <span className="float-end">{data[3]}</span>
        </div>
        <MDBProgress height="10" style={{ borderRadius: '0.5rem' }}>
          <MDBProgressBar
            style={{ backgroundColor: '#68c88e' }}
            width={(data[3] / total) * 100}
            valuemin={0}
            valuemax={total}
          />
        </MDBProgress>
      </div>

      <div>
        <div style={{ fontSize: '0.9rem' }}>
          <span>Info</span>
          <span className="float-end">{data[4]}</span>
        </div>
        <MDBProgress height="10" style={{ borderRadius: '0.5rem' }}>
          <MDBProgressBar
            style={{ backgroundColor: '#b9c9dc' }}
            width={(data[4] / total) * 100}
            valuemin={0}
            valuemax={total}
          />
        </MDBProgress>
      </div>
    </>
  );
};

export default MyProgressBar;

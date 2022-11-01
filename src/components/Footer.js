import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <Link to="/homepage" className="me-4 text-reset">
            <MDBIcon color="primary" fab icon="facebook-f" />
          </Link>
          <Link to="/homepage" className="me-4 text-reset">
            <MDBIcon color="primary" fab icon="twitter" />
          </Link>
          <Link to="/homepage" className="me-4 text-reset">
            <MDBIcon color="primary" fab icon="google" />
          </Link>
          <Link to="/homepage" className="me-4 text-reset">
            <MDBIcon color="primary" fab icon="instagram" />
          </Link>
          <Link to="/homepage" className="me-4 text-reset">
            <MDBIcon color="primary" fab icon="linkedin" />
          </Link>
          <Link to="/homepage" className="me-4 text-reset">
            <MDBIcon color="primary" fab icon="github" />
          </Link>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="primary" icon="gem" className="me-3" />
                Company name
              </h6>
              <h4 className="fw-light">CrowChain</h4>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#scan" className="text-reset">
                  Security scan
                </a>
              </p>
              <p>
                <Link to="/homepage" className="text-reset">
                  Scam detection
                </Link>
              </p>
              <p>
                <a href="#manual-audit" className="text-reset">
                  Manual audit
                </a>
              </p>
              <p>
                <Link to="/homepage" className="text-reset">
                  Blockchain solutions
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#market-cap" className="text-reset">
                  Market cap
                </a>
              </p>
              <p>
                <Link to="/homepage" className="text-reset">
                  Pricing
                </Link>
              </p>
              <p>
                <a href="#about" className="text-reset">
                  About us
                </a>
              </p>
              <p>
                <a href="#help" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon color="primary" icon="home" className="me-3" />
                Ha Noi, Vietnam
              </p>
              <p>
                <MDBIcon color="primary" icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon color="primary" icon="phone" className="me-3" /> + 01
                234 567 88
              </p>
              <p>
                <MDBIcon color="primary" icon="print" className="me-3" /> + 01
                234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <MDBContainer className="p-4 pb-0">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <MDBRow id="manual-audit">
            <MDBCol size="auto" className=" mb-md-0">
              <p className="pt-2">
                <strong>Request for manual audit</strong>
              </p>
            </MDBCol>

            <MDBCol md="5" size="12" className="mb-4 mb-md-0">
              <MDBInput type="text" id="form5Example2" label="Email address" />
            </MDBCol>

            <MDBCol size="auto" className="mb-4 mb-md-0">
              <MDBBtn>Request</MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        © 2022 Copyright:
        <Link className="text-reset fw-bold" to="/homepage">
          crowchain.com
        </Link>
      </div>
    </MDBFooter>
  );
};

export default Footer;

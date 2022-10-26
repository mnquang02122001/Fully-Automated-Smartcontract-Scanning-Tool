import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from 'mdb-react-ui-kit';
import GoogleLoginButton from '../components/GoogleLoginButton';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <MDBContainer
      fluid
      style={{ height: '100vh', overflow: 'auto', backgroundColor: '#508BFC' }}
    >
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: '1rem', maxWidth: '500px' }}
          >
            <form onSubmit={handleSubmit}>
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <MDBIcon
                  fas
                  icon="crow fa-2x"
                  style={{ color: '#709085' }}
                  className="mx-auto mb-3 mt-1"
                />
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

                <MDBCheckbox
                  name="flexCheck"
                  id="flexCheckDefault"
                  className="mb-4"
                  label="Remember password"
                />

                <MDBBtn size="lg">Login</MDBBtn>

                <hr className="my-4" />
                <MDBCol className="d-flex justify-content-center align-items-center">
                  <p className="text-center my-0 mx-2">Or login with</p>
                  <GoogleLoginButton className="ml-5" />
                </MDBCol>
              </MDBCardBody>
            </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;

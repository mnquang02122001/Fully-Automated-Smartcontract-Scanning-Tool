import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBDropdown,
} from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
const NavBar = () => {
  // Get from local storage
  const avatarLink =
    'https://lh3.googleusercontent.com/a/ALm5wu1j6ie33xs4tsjaOHe0yQRT3iXeAcoEx2bSADFW=s96-c';
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <MDBNavbar expand="md" light bgColor="light" className="py-3">
      <MDBContainer fluid>
        <Link to="/homepage">
          <MDBNavbarBrand className="h1 mb-0 py-0">
            <img src={logo} height="45" alt="Logo" loading="lazy" />
            <span className="text-lg">CrowChain</span>
          </MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNav} navbar>
          <MDBNavbarNav
            right
            fullWidth={false}
            className="mb-2 mb-lg-0 align-items-md-center"
          >
            <MDBNavbarItem>
              <Link to="/homepage">
                <MDBNavbarLink aria-current="page" className="pe-4 ">
                  Scan
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              {/* <Link to="#manual-audit"> */}
              <a href="#manual-audit">
                <MDBNavbarLink className="pe-4">Manual audit</MDBNavbarLink>
              </a>
              {/* </Link> */}
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/homepage">
                <MDBNavbarLink className="pe-4">Features</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/homepage">
                <MDBNavbarLink className="pe-4">Pricing</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/homepage">
                <MDBNavbarLink className="pe-5">About</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link d-flex align-items-center"
                >
                  <img
                    src={avatarLink}
                    className="rounded-circle"
                    height="35"
                    alt="Avatar"
                    loading="lazy"
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink>Home page</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink>User profile</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink onClick={handleLogout}>
                      <span className="me-1">Logout</span>
                      <MDBIcon fas icon="sign-out-alt" />{' '}
                    </MDBDropdownLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar;

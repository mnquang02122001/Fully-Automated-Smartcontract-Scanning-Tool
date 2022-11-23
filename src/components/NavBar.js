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
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
const NavBar = ({ user }) => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <MDBNavbar expand="md" light bgColor="light" className="py-3">
      <MDBContainer fluid>
        <MDBNavbarBrand className="h1 mb-0 py-0" href="/homepage">
          <img src={logo} height="45" alt="Logo" loading="lazy" />
          <span className="text-lg">CrowChain</span>
        </MDBNavbarBrand>
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
              <MDBNavbarLink
                aria-current="page"
                className="pe-4"
                href="/homepage#scan"
              >
                Scan
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className="pe-4" href="/homepage#manual-audit">
                Manual audit
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className="pe-4" href="/homepage#market-cap">
                Market cap
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className="pe-4" href="/homepage#help">
                Help
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className="pe-5" href="/homepage#about">
                About
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* Avatar */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link d-flex align-items-center"
                >
                  <img
                    src={user.picture}
                    className="rounded-circle"
                    height="35"
                    alt="Avatar"
                    loading="lazy"
                    style={{ cursor: 'pointer' }}
                  />
                  <span
                    className="ms-1 text-dark"
                    style={{ cursor: 'pointer' }}
                  >
                    {user.name}
                  </span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/homepage">
                      Home page
                    </MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/homepage">
                      User profile
                    </MDBDropdownLink>
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
            {/* Avatar */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar;

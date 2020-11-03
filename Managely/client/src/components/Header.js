import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Header = () => {
  const { isLoggedIn, logout, isPropertyManager } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar color="secondary" dark expand="lg">
        <NavbarBrand tag={RRNavLink} to="/">Managely</NavbarBrand>
        <NavbarToggler className="font-weight-bold bg-secondary text-white rounded" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isLoggedIn &&
              <NavItem className="mx-0 mx-lg-1">
                <NavLink tag={RRNavLink} to="/">Dashboard</NavLink>
              </NavItem>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn && isPropertyManager &&
              <>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/properties">Properties</NavLink>
                </NavItem>
                {/* <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="">Work Orders</NavLink>
                </NavItem> */}
                {/* <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="">Settings</NavLink>
                </NavItem> */}
                <NavItem className="mx-0 mx-lg-1">
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {isLoggedIn && !isPropertyManager &&
              <>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/settings">Settings</NavLink>
                </NavItem>
                <NavItem className="mx-0 mx-lg-1">
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem className="mx-0 mx-lg-1">
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
}

export default Header;
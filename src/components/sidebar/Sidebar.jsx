import React, { memo, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import {FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Theme} from "../ThemeContext/ThemeContext";
const Sidebar = () => {
  const{toggleTheme,mode}=useContext(Theme)
  return (
    <Navbar expand="lg" className={mode === "light" ? "bg-light" : "bg-dark"} variant={mode === "light" ? "light" : "dark"}>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="">
              Products
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px", marginLeft: "auto" }}
            navbarScroll
          >
            <Nav.Link onClick={toggleTheme} style={{ cursor: "pointer" }}>
              {mode === "light" ? <FaMoon size={25} /> : <FaSun size={25} />}
            </Nav.Link>
            <Nav.Link as={Link} to="/Cart">
              <FaShoppingCart size={30} />
            </Nav.Link>
            <Nav.Link as={Link} to="/Login">
              <FaUser size={30} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;

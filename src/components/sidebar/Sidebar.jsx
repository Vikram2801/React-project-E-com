import React, { memo, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Theme } from "../ThemeContext/ThemeContext";
import "../sidebar/Sidebar.css";
const Sidebar = () => {
  const navigate = useNavigate();
  let [search, setSearch] = useState("");
  const handleClick = (e) => {
   e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/");
    }
  };
  const { toggleTheme, mode } = useContext(Theme);
  return (
    <Navbar
      expand="lg"
      className={mode === "light" ? "bg-light" : "bg-dark"}
      variant={mode === "light" ? "light" : "dark"}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="">
          <img src="/shoplogo.png" alt="logo" className="img-fluid imgclass" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px", marginLeft: "auto" }}
            navbarScroll
          >
             <Form className="d-flex" onSubmit={handleClick}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
             <Button variant="outline-success" type="submit">Search</Button>
          </Form>
            <Nav.Link  onClick={toggleTheme} style={{ cursor: "pointer" }}>
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

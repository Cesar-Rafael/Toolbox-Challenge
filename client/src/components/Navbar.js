import { Container, Navbar } from "react-bootstrap";
import logo from "../logo.svg";

const NavbarH = () => {
  return (
    <Navbar bg="danger" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span className="fw-bold">React Test App</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarH;

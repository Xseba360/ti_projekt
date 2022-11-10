import {Outlet} from "react-router-dom";
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {CiSearch} from "react-icons/ci";
import {LinkContainer} from 'react-router-bootstrap'
import {useState} from "react";

const Layout = () => {
    const [menuOpenLeft, setMenuOpenLeft] = useState(false)
    const toggleMenuLeft = () => {
        setMenuOpenLeft(!menuOpenLeft)
    }

    const handleCloseLeft = () => setMenuOpenLeft(false)

    const [menuOpenRight, setMenuOpenRight] = useState(false)
    const toggleMenuRight = () => {
        setMenuOpenRight(!menuOpenRight)
    }

    const handleCloseRight = () => setMenuOpenRight(false)

    const expand = false
    return (
        <>
            <Navbar bg="light" expand={expand} className="mb-3">
                <Container fluid>
                    {/*<div style={
                        {
                            padding: "var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x)",
                            border: "var(--bs-border-width) solid transparent"
                        }
                    }>
                        <div style={{
                            width: "1.875em",
                        }}></div>
                    </div>*/}
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbarLeft-expand-${expand}`}
                        onClick={toggleMenuLeft}
                    />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbarLeft-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabelLeft-expand-${expand}`}
                        placement="start"
                        restoreFocus={false}
                        show={menuOpenLeft}
                        onHide={handleCloseLeft}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabelLeft-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <LinkContainer to="/" onClick={toggleMenuLeft}>
                                    <Nav.Link>Strona Główna</Nav.Link>
                                </LinkContainer>
                                <NavDropdown
                                    title="Dropdown"
                                    id={`offcanvasNavbarDropdownLeft-expand-${expand}`}
                                >
                                    <LinkContainer to="/category/1" onClick={toggleMenuLeft}>
                                        <NavDropdown.Item>Kategoria 1</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/2" onClick={toggleMenuLeft}>
                                        <NavDropdown.Item>Kategoria 2</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/3" onClick={toggleMenuLeft}>
                                        <NavDropdown.Item>Kategoria 3</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/4" onClick={toggleMenuLeft}>
                                        <NavDropdown.Item>Kategoria 4</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/5" onClick={toggleMenuLeft}>
                                        <NavDropdown.Item>Kategoria 5</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Wyszukaj produkt"
                                    className="me-2"
                                    aria-label="Wyszukaj produkt"
                                />
                                <Button variant="outline-success"><CiSearch/></Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <LinkContainer to="/">
                        <Navbar.Brand>Møbel</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbarRight-expand-${expand}`}
                        onClick={toggleMenuRight}
                    />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbarRight-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabelRight-expand-${expand}`}
                        placement="end"
                        restoreFocus={false}
                        show={menuOpenRight}
                        onHide={handleCloseRight}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabelRight-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <LinkContainer to="/" onClick={toggleMenuRight}>
                                    <Nav.Link>Strona Główna</Nav.Link>
                                </LinkContainer>
                                <NavDropdown
                                    title="Dropdown"
                                    id={`offcanvasNavbarDropdownRight-expand-${expand}`}
                                >
                                    <LinkContainer to="/category/1" onClick={toggleMenuRight}>
                                        <NavDropdown.Item>Kategoria 1</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/2" onClick={toggleMenuRight}>
                                        <NavDropdown.Item>Kategoria 2</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/3" onClick={toggleMenuRight}>
                                        <NavDropdown.Item>Kategoria 3</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/4" onClick={toggleMenuRight}>
                                        <NavDropdown.Item>Kategoria 4</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/category/5" onClick={toggleMenuRight}>
                                        <NavDropdown.Item>Kategoria 5</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Wyszukaj produkt"
                                    className="me-2"
                                    aria-label="Wyszukaj produkt"
                                />
                                <Button variant="outline-success"><CiSearch/></Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            <Outlet/>
        </>
    )
};

export default Layout;
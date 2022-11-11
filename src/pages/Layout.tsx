import {Link, Outlet} from 'react-router-dom'
import {Button, Container, Form, Nav, Navbar, Offcanvas} from 'react-bootstrap'
import {CiSearch} from 'react-icons/ci'
import {LinkContainer} from 'react-router-bootstrap'
import {useEffect, useState} from 'react'
import {CacheManager} from '../CacheManager'
import {BsCart, BsList} from "react-icons/bs";
import {FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaTwitter, FaYoutube} from "react-icons/fa";

function Layout() {
    const [categories, setCategories] = useState([] as Category[])

    useEffect(() => {
        async function getCategories() {
            const categories = await CacheManager.getAllCategories()
            setCategories(categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name)))
        }

        if (categories.length < 1) {
            getCategories().then()
        }
    }, [categories])
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
            <Navbar bg="light" expand={expand} sticky='top'>
                <Container fluid>
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbarLeft-expand-${expand}`}
                        onClick={toggleMenuLeft}
                    >
                        <BsList size={"1.5em"}/>
                    </Navbar.Toggle>
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
                                Kategorie
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {
                                    categories.map((category: Category) => (
                                        <LinkContainer key={category.uuid} to={`/category/${category.uuid}`}
                                                       onClick={toggleMenuLeft}>
                                            <Nav.Link>{category.name}</Nav.Link>
                                        </LinkContainer>
                                    ))
                                }
                                <hr></hr>
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
                    >
                        <BsCart size={"1.5em"}/>
                    </Navbar.Toggle>
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
                                Koszyk
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <LinkContainer to="/" onClick={toggleMenuRight}>
                                    <Nav.Link>Strona Główna</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <main className='pt-3'>
                <Container fluid={"md"}>
                    <Outlet/>
                </Container>
                <div className="container">
                    <footer
                        className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <div className="col-md-4 d-flex align-items-center">
                            <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                <div className='brand'>Møbel</div>
                            </Link>
                            <span className="mb-3 mb-md-0 text-muted">&copy; 2022</span>
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                            <li className="ms-3">
                                <a className="text-muted" href="https://twitter.com/">
                                    <FaTwitter/>
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="text-muted" href="https://instagram.com/">
                                    <FaInstagram/>
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="text-muted" href="https://facebook.com/">
                                    <FaFacebook/>
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="text-muted" href="https://youtube.com/">
                                    <FaYoutube/>
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="text-muted" href="https://linkedin.com/">
                                    <FaLinkedinIn/>
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="text-muted" href="https://pinterest.com/">
                                    <FaPinterest/>
                                </a>
                            </li>
                        </ul>
                    </footer>
                </div>
            </main>
        </>

    )
}

export default Layout
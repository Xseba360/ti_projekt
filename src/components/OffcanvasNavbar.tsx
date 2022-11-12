import {Button, Form, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {BsCart, BsList} from "react-icons/bs";

import {useEffect, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {LinkContainer} from "react-router-bootstrap";
import {CacheManager} from "../CacheManager";

interface OffcanvasNavbarProps {
    placement: 'start' | 'end'
}

function OffcanvasNavbar(props: OffcanvasNavbarProps) {
    const [categories, setCategories] = useState([] as Category[])
    const {placement} = props;
    useEffect(() => {
        if (placement === 'end') {
            return
        }

        async function getCategories() {
            const categories = await CacheManager.getAllCategories()
            setCategories(categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name)))
        }

        if (categories.length < 1) {
            getCategories().then()
        }
    }, [categories, placement])
    const expand = false
    let title = 'Menu'
    if (placement === 'start') {

        title = 'Kategorie'
    } else if (placement === 'end') {
        title = 'Koszyk'
    }


    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const handleClose = () => setMenuOpen(false)


    return (
        <>
            <Navbar.Toggle
                aria-controls={`offcanvasNavbar-${placement}-expand-${expand}`}
                onClick={toggleMenu}
            >
                {placement === 'start' ? <BsList size={"1.5em"}/> : <BsCart size={"1.5em"}/>}
            </Navbar.Toggle>
            <Navbar.Offcanvas
                id={`offcanvasNavbar-${placement}-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-${placement}-expand-${expand}`}
                placement={placement}
                restoreFocus={false}
                show={menuOpen}
                onHide={handleClose}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-${placement}-expand-${expand}`}>
                        {title}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {placement === 'start' ? (
                        <>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Wyszukaj produkt"
                                    className="me-2"
                                    aria-label="Wyszukaj produkt"
                                />
                                <Button variant="outline-success"><CiSearch/></Button>
                            </Form>
                            <hr></hr>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {
                                    categories.map((category: Category) => (
                                        <LinkContainer key={category.uuid} to={`/category/${category.uuid}`}
                                                       onClick={toggleMenu}>
                                            <Nav.Link>{category.name}</Nav.Link>
                                        </LinkContainer>
                                    ))
                                }
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <LinkContainer to="/" onClick={toggleMenu}>
                                    <Nav.Link>Strona Główna</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </>
                    )}

                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </>
    )
}

export default OffcanvasNavbar;

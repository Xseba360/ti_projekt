import {Outlet} from 'react-router-dom'
import {Container, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import OffcanvasNavbar from "../components/OffcanvasNavbar";
import Footer from "../components/Footer";

function Layout() {
    const expand = false
    return (
        <>
            <Navbar bg="light" expand={expand} sticky='top'>
                <Container fluid>
                    <OffcanvasNavbar placement={"start"}/>
                    <LinkContainer to="/">
                        <Navbar.Brand>Møbel</Navbar.Brand>
                    </LinkContainer>
                    <OffcanvasNavbar placement={"end"}/>
                </Container>
            </Navbar>
            <main className='pt-3'>
                <Container fluid={"md"}>
                    <Outlet/>
                </Container>
                <Footer/>
            </main>
        </>

    )
}

export default Layout
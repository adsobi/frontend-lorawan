import { Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/Auth"

const Navbar: React.FC = () => {
    const { token, onLogout } = useAuth();

    return <NavbarBs sticky="top" className="bg-white shadow-sm">
        <Container className="navbar d-flex justify-content-around flex-wrap">
            <Nav className="me-auto px-1">
                <Nav.Link className="mx-2 btn btn-outline-secondary d-flex align-items-center" as={NavLink} to={"/applications"}>
                    Aplikacje
                </Nav.Link>
                <Nav.Link className="mx-2 btn btn-outline-secondary d-flex align-items-center" as={NavLink} to={"/gateways"}>
                    Bramki sieciowe
                </Nav.Link>
                <Nav.Link className="mx-2 btn btn-outline-secondary d-flex align-items-center" as={NavLink} to={"/endnodes"}>
                    Urządzenia końcowe
                </Nav.Link>
            </Nav>
            {
                token !== null ? <Button className="navbar-button" variant="outline-primary" onClick={onLogout}>Wyloguj</Button> : null
            }

        </Container>
    </NavbarBs>
}
export default Navbar;
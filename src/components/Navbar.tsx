import { Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/Auth"

const Navbar: React.FC = () => {
    const { token, onLogout } = useAuth();

    return <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link className="mx-2" as={NavLink} to={"/applications"}>
                    Aplikacje
                </Nav.Link>
                <Nav.Link className="mx-2" as={NavLink} to={"/gateways"}>
                    Bramki sieciowe
                </Nav.Link>
                <Nav.Link className="mx-2" as={NavLink} to={"/endnodes"}>
                    Urządzenia końcowe
                </Nav.Link>
            </Nav>
            {
                token !== null ? <Button variant="outline-primary" onClick={onLogout}>Wyloguj</Button> : null
            }

        </Container>
    </NavbarBs>
}
export default Navbar;
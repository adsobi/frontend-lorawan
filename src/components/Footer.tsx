import { Button, Container, Nav, Navbar, ModalFooter, Row} from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/Auth"

const Footer: React.FC = () => {
    return <Row className="bg-white shadow-sm fixed-bottom py-0">
        <Container className="d-flex justify-content-center">
            <div className="text-center py-2 d-flex px-1 my-auto">
                Projekt wykonany w ramach realizacji pracy dyplomowej magisterskiej ~ Politechnika Poznańska 2022
            </div>
            <img
          src="/logo_pp.png"
          alt="logo pp"
          className="p-0 m-0 my-auto"
          style={{width: '5rem', height: '5rem'}}
        />
        </Container>
    </Row>
}
export default Footer;
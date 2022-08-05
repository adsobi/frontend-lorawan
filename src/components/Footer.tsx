import { Button, Container, Nav, Navbar, ModalFooter} from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import useAuth from "../hooks/Auth"

const Footer: React.FC = () => {
    return <Navbar className="bg-white shadow-sm fixed-bottom py-0">
        <Container className="d-flex justify-content-center">
            <div className="text-center py-2 d-flex">
                Projekt wykonany w ramach realizacji pracy dyplomowej magisterskiej ~ Politechnika Poznańska 2022
            </div>
            <img
          src="/logo_pp.png"
          alt="logo pp"
          className="p-0 m-0"
          style={{width: '4.4rem'}}
        />
        </Container>
    </Navbar>
}
export default Footer;
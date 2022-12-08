import {Container, Nav, Navbar} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Navigation () {

const dispatch = useDispatch();
const navigate = useNavigate();
let token = useSelector(state=>state.token);

const logout = async() => {
    await dispatch({ type: 'LOG_OUT' })
    navigate('/', {replace: true})
}

    return(
        <Navbar bg="dark" variant="dark" expand="lg" className='fixed-top'>
        {token&&<Container>
          <Navbar.Brand href="#home">Billing</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {/* <Nav.Link to={'/home'}>Home</Nav.Link> */}
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>}
      </Navbar>
    )
}
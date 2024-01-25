import Nav from 'react-bootstrap/Nav';
import { NewListModal } from '../new-list-modal/NewListModal';
import Button from 'react-bootstrap/Button';
import { BsPlusLg } from 'react-icons/bs';
import { useShowModal } from "./useShowModal.js"

export function ListNameTabs({tabs, ids}) {
    const [ show, handleClose, handleShow ] = useShowModal();

    return(
    <Nav variant="underline">
      {tabs.map((tab, i) =>
        <Nav.Item><Nav.Link eventKey={ids[i]}>{tab}</Nav.Link></Nav.Item>
      )}
      <Button variant="link" onClick={() => handleShow()}><BsPlusLg/></Button>
      <NewListModal handleClose={() => handleClose()} show={show}/>
    </Nav>
    );
  }
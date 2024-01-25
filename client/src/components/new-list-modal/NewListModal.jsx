import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { newList } from "../../apis/requests.js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function NewListModal({handleClose, show}) {
    
    const [val, setVal] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    return(
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form >
            <Form.Control type="add-list" className="me-auto" placeholder="New List" onChange={e => setVal(e.target.value)}/>
          </Form> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {getAccessTokenSilently({authorizationParams:{audience: audience}}).then(t => {newList(val, t);handleClose();})}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
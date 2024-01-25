import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { BsPlusLg } from 'react-icons/bs';


export function AddToDoForm({currentTab, handleNewToDoSubmit}) {
    const [value, setValue] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    return(
    <Form >
      <Stack direction="horizontal" gap={2} className="align-bottom">
        <Form.Control type="add-todo" className="me-auto" placeholder="New ToDo" onChange={e => setValue(e.target.value)}/>
        <Button variant="primary" type="button" onClick={() => {getAccessTokenSilently({authorizationParams:{audience: audience}}).then(t => {handleNewToDoSubmit(currentTab, value, t)})}}><BsPlusLg/></Button>
      </Stack>
    </Form> 
    );
  }
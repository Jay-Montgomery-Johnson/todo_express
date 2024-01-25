import { useAuth0 } from "@auth0/auth0-react";
import { completeToDo, deleteToDo } from "../../apis/requests";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { BsTrash, BsCheck} from 'react-icons/bs';

export function ToDoRow({ToDo, thisListId, thisItemId, thisItemCompleted, setListItems}) {
    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    return(
    <Stack direction="horizontal" gap={2}>
      <p className="itemText me-auto" style={{textDecoration: thisItemCompleted ? 'line-through':'none'}}>{ToDo}</p>
      <Button variant="success" onClick={() => {getAccessTokenSilently({authorizationParams:{audience: audience}}).then(t => {completeToDo(thisListId, thisItemId, thisItemCompleted, setListItems, t)})}}><BsCheck/></Button>
      <Button variant="danger" onClick={() => {getAccessTokenSilently({authorizationParams:{audience: audience}}).then(t => {deleteToDo(thisListId, thisItemId, setListItems, t)})}}><BsTrash/></Button>
    </Stack>
    );
  }
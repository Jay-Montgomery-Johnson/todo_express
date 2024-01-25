import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
import { deleteList } from '../../apis/requests.js';

export function DeleteListButton({listId}) {
    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    return(
      <Button variant="danger" onClick={() => {getAccessTokenSilently({authorizationParams:{audience: audience}}).then(t => {deleteList(listId, t)})}}>
        Delete List
      </Button>
    );
}
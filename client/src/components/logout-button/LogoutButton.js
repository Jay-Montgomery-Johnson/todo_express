import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

export default  function LogoutButton() {
    const {logout, isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
            <Button onClick={() => logout()}>
                Sign out
            </Button>
        )
    )
}
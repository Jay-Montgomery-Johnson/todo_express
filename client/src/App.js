import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/login-button/LoginButton.js';
import LogoutButton from './components/logout-button/LogoutButton.js';
import ContentPage from "./components/content-page/ContentPage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';

function App() {
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  return (
  <div className='App'>
    <LoginButton/>
    <LogoutButton/>
    {isAuthenticated && (<><ContentPage/>
      {() => getAccessTokenSilently({
      authorizationParams: {
        audience: audience
      },
    })}</>)}
  </div>
  );
}

export default App;
import AuthService from '../authentication/AuthService';
import hamburguer from '../svg/hamburguer.svg';
import logo from '../svg/logo.svg';
import settings from '../svg/settings.svg';
import './NavBar.css';

function handleLogOut() {
    AuthService.logout();
}

function NavBar() {

    return (
        <div className="NavBar">
            <div className="NavBar-left">
                <img src={hamburguer} className="NavBar-hamburguer" alt="menu" />
                <a className='NavBar-home-link'>
                    <img src={logo} className="NavBar-logo" alt="logo" />
                    Tool Name
                </a>
            </div>
            <div className="NavBar-right">
                <a className='NavBar-right-settings-button' onClick={handleLogOut} href='/login'>
                    <img src={settings} className="NavBar-right-settings-button-image" alt="settings" />
                </a>
            </div>
        </div>
    );
}

export default NavBar;
import hamburguer from '../svg/hamburguer.svg';
import logo from '../svg/logo.svg';
import settings from '../svg/settings.svg';
import './NavBar.css';

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
                <img src={settings} className="NavBar-settings" alt="settings" />
            </div>
        </div>
    );
}

export default NavBar;
import './SlideBar.css';
import construction from './construction.svg';
import graph from './graph.svg';
import user from './user.svg';

function SlideBar() {
    return (
        <div className="SlideBar">
            <img src={graph} className='SlideBar-icon' alt="Human factors graph" />
            <img src={user} className='SlideBar-icon' alt="Team management" />
            <a href="/login" className='SlideBar-button'>
                <img src={construction} className='SlideBar-button-icon' alt="Login page"/>
            </a>
        </div>
    );
}

export default SlideBar;
import './SlideBar.css'
import graph from './graph.svg'
import user from './user.svg'
import construction from './construction.svg'

function SlideBar() {
    return (
        <div className="SlideBar">
            <img src={graph} className='SlideBar-icon' alt="Human factors graph" />
            <img src={user} className='SlideBar-icon' alt="Team management" />
            <a href="/login">
            <img src={construction} className='SlideBar-icon' alt="Login page"/>
            </a>
        </div>
    );
}

export default SlideBar;
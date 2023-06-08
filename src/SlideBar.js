import './SlideBar.css'
import graph from './graph.svg'
import user from './user.svg'

function SlideBar() {
    return (
        <div className="SlideBar">
            <img src={graph} className='SlideBar-icon' alt="Human factors graph" />
            <img src={user} className='SlideBar-icon' alt="Team management" />
        </div>
    );
}

export default SlideBar;
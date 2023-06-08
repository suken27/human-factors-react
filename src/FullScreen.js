import NavBar from './NavBar'
import SlideBar from './SlideBar'
import MainScreen from './MainScreen'
import './FullScreen.css'

function FullScreen() {
    return(
        <div className="FullScreen">
            <NavBar/>
            <div className="FullScreen-belowNavBar">
                <SlideBar/>
                <MainScreen/>
            </div>
        </div>
    );
}

export default FullScreen;
import GraphComponent from '../GraphComponent';
import network from '../svg/network_diagram.svg';
import './MainScreen.css';

function MainScreen() {
    return(
        <div className="MainScreen">
            <div className="MainScreen-content">
                <img src={network} className='MainScreen-stub' />
                <GraphComponent/>
            </div>
        </div>
    );
}

export default MainScreen;
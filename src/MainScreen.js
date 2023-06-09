import GraphComponent from './GraphComponent';
import './MainScreen.css'
import network from './network_diagram.svg'

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
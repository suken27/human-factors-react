import network from "../svg/network_diagram.svg";
import "./GraphScreen.css";

function GraphScreen() {
    return(
        <div className="GraphScreen">
            <img src={network} className="GraphScreen-stub" />
        </div>
    );
}

export default GraphScreen;
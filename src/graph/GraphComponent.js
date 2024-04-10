import * as d3 from "d3";
import PropTypes from "prop-types";
import ScatterplotReactControlled from "./ScatterplotReactControlled";

const GraphComponent = (props) => {
  const margin = { top: 30, right: 10, bottom: 50, left: 60 };

  const colorScale = d3.scaleOrdinal()
  .domain(props.data.ids)
  .range(d3.schemeTableau10);

  return (
    <ScatterplotReactControlled margin={margin} colorScale={colorScale} data={props.data.experience}/>
  );
};

GraphComponent.propTypes = {
  data: PropTypes.shape({ 
    ids: PropTypes.array.isRequired,
    experience: PropTypes.array.isRequired
  }).isRequired
};

export default GraphComponent;

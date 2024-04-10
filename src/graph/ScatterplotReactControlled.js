import * as d3 from "d3";
import PropTypes from "prop-types";
import Axis from "./Axis";
import ChartContainer from "./ChartContainer";
import Circle from "./Circle";

const ScatterplotReactControlled = (props) => {
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(props.data, (d) => d.user_count)])
    .range([0, innerWidth])
    .nice();
  const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

  return (
    <div>
      <h2>Retention vs Usage</h2>
      <ChartContainer width={width} height={height} margin={props.margin}>
        <Axis
          type="bottom"
          scale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={"User Count"}
        />

        <Axis
          type="left"
          scale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          label={"Retention %"}
        />
        {props.data.map((framework) => (
          <Circle
            key={`circle-${framework.id}`}
            cx={xScale(framework.user_count)}
            cy={yScale(framework.retention_percentage)}
            r={6}
            fill={props.colorScale(framework.id)}
          />
        ))}
      </ChartContainer>
    </div>
  );
};

ScatterplotReactControlled.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired,
  data: PropTypes.array.isRequired
};

export default ScatterplotReactControlled;

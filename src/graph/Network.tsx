import PropTypes from "prop-types";
import { Fragment, useEffect, useRef } from "react";
import { Data } from "./GraphData";
import { drawNetwork } from "./drawNetwork";

type NetworkProps = {
  width: number;
  height: number;
  data: Data;
};

export const Network = ({ width, height, data }: NetworkProps) => {
  const svgRef = useRef(null);

  useEffect(() => {
    drawNetwork({ data, width, height, svgRef });
  });



  return (
    <Fragment>
      <h2>Network</h2>
      <svg width={width} height={height} ref={svgRef}>
        <g className="nodes" style={{ stroke: "#000", strokeOpacity: 0.5 }} />
      </svg>
    </Fragment>
  );
};

Network.propTypes = {
  data: PropTypes.array.isRequired,
};

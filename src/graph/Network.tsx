import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Data } from "./GraphData";
import { drawNetwork } from "./drawNetwork";

type NetworkProps = {
  data: Data;
};

export const Network = ({ data }: NetworkProps) => {
  const [width, setWidth] = useState<any>(null);
  const [height, setHeight] = useState<any>(null);

  const svgRef = useRef<any>(null);

  useEffect(() => {
    function updateSize() {
      if (svgRef.current) {
        setWidth(window.innerWidth - 400);
        setHeight(window.innerHeight - 300);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    drawNetwork({ data, width, height, svgRef });
  });

  return (
    <div className="flex1" style={{display: "flex", flexDirection: "column"}}>
      <h2>Network</h2>
      <div className="flex1" ref={svgRef}>
        <svg width={width} height={height}>
          <g className="nodes" />
        </svg>
      </div>
    </div>
  );
};

Network.propTypes = {
  data: PropTypes.array.isRequired,
};

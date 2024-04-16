import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { RADIUS, drawNetwork } from "./DrawNetwork";
import { Data, Node } from "./GraphData";

type NetworkProps = {
  width: number;
  height: number;
  data: Data;
};

export const Network = ({width, height, data}: NetworkProps) => {

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  const nodes: Node[] = data.nodes.map((d) => ({ ...d }));

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // set dimension of the canvas element
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

    // run d3-force to find the position of nodes on the canvas
    d3.forceSimulation(nodes)

      // list of forces we apply to get node positions
      .force('collide', d3.forceCollide().radius(RADIUS))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

      // at each iteration of the simulation, draw the network diagram with the new node positions
      .on('tick', () => {
        drawNetwork(context, width, height, nodes);
      });
  }, [width, height, nodes]);

  return (
    <div>
      <h2>Network</h2>
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
      />
    </div>
  );
};

Network.propTypes = {
  data: PropTypes.array.isRequired,
};

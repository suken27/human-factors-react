import {
  D3DragEvent,
  drag,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  interpolateRdYlGn,
  select,
} from "d3";

import { Data } from "./GraphData";

export function drawNetwork({
  data,
  width,
  height,
  svgRef,
}: {
  data: Data;
  width: number;
  height: number;
  svgRef: any;
}) {
  const fillOpacity = 0.7;
  const colors = interpolateRdYlGn;

  const nodes = data.nodes.map((d) => Object.create(d));
  const links = data.links.map((d) => Object.create(d));

  const simulation = forceSimulation(nodes)
    .force(
      "link",
      forceLink(links).id((d: any) => d.id)
    )
    .force(
      "charge",
      forceManyBody()
        .strength(-100)
        .distanceMax(Math.min(width, height) * 0.18)
    )
    .force("collide", forceCollide(10))
    .force("center", forceCenter(width / 2, height / 2));

  const linksG = select(svgRef.current)
    .select("g.links")
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.5)
    .selectAll("line")
    .data(links)
    .join("line");

  const nodesG = select(svgRef.current)
    .select("g.nodes")
    .selectAll("circle")
    .data(nodes)
    .join<any>("circle")
    .attr("fill", (d: any) => (d.fullyMeasured ? colors(d.score) : "gray"))
    .attr("fill-opacity", fillOpacity)
    .attr("r", 8);

  nodesG.call(
    drag<any, any>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  );

  nodesG.append("title").text((d: any) => d.title);

  function dragstarted(
    this: SVGCircleElement,
    event: D3DragEvent<SVGCircleElement, Node, any>
  ) {
    simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
    select(this).attr("stroke", "black");
  }

  function dragged(event: D3DragEvent<SVGCircleElement, Node, any>) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(
    this: SVGCircleElement,
    event: D3DragEvent<SVGCircleElement, Node, any>
  ) {
    simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
    select(this).attr("stroke", null);
  }

  simulation.on("tick", () => {
    linksG
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    nodesG.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    console.log("tick");
  });
}

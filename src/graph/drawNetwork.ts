import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  interpolateRdYlGn,
  select
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

  const tooltip = select(svgRef.current)
  .select("g.nodes")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function() {
    tooltip
      .style("opacity", 1);
  }
  const mousemove = function(event: any, d: any) {
    tooltip
      .html(d.title)
      .style("left", event.pageX + 70 + "px")
      .style("top", event.pageY + 70 + "px")
  }
  const mouseleave = function() {
    tooltip
      .style("opacity", 0);
  }

  const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink(links).id((d: any) => d.id)
      )
      .force("charge", forceManyBody().strength(-10))
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
    .selectAll("a")
    .data(nodes)
    .join("a");

  nodesG
    .append("circle")
    .attr("fill", (d: any) => (d.fullyMeasured ? colors(d.score) : "gray"))
    .attr("fill-opacity", fillOpacity)
    .attr("r", () => Math.min(width, height) * 0.01)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  simulation.on("tick", () => {
    linksG
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    nodesG.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  });

}

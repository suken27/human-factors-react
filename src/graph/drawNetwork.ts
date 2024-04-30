import {
  easeLinear,
  hierarchy,
  interpolateWarm,
  pack,
  range,
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

  const stroke = null; // a static stroke around the bubbles
  const strokeWidth = null; // the stroke width around the bubbles, if any
  const strokeOpacity = null; //
  const fillOpacity = 0.7;
  const colors = interpolateWarm;

  const D = data.nodes.map((d) => d);
  console.log(D);

  // TODO: This d.id.length should instead use a value for the "importance" of a human factor
  const V = data.nodes.map((d) => d.title.length);
  console.log(V);

  const I = range(V.length).filter((i) => V[i] > 0);
  console.log(I);

  const root = pack()
    .size([width - 20, height - 20]).padding(3)(hierarchy<any>({ children: I }).sum((i) => V[i]));

  const nodes = select(svgRef.current).select("g.nodes");

  nodes
    .selectAll("a")
    .data(root.leaves())
    .join(
      (enter: any): any => {
        const a = enter.append("a");
        a.transition(easeLinear)
          .delay(500)
          .duration(500)
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        a.append("circle")
          .transition(easeLinear)
          .delay(500)
          .duration(500)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("stroke-opacity", strokeOpacity)
          .attr("fill", (d: any) => colors(d.data / D.length))
          .attr("fill-opacity", fillOpacity)
          .attr("r", (d: any) => d.r);
      },
      (update: any): any => {
        update
          .transition(easeLinear)
          .delay(500)
          .duration(500)
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        update
          .select("circle")
          .transition(easeLinear)
          .delay(500)
          .duration(500)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("stroke-opacity", strokeOpacity)
          .attr("fill", (d: any) => colors(d.data / D.length))
          .attr("fill-opacity", fillOpacity)
          .attr("r", (d: any) => d.r);
      },
      (exit: any): void => {
        exit.transition(easeLinear).duration(500).remove();
      }
    );
}

import { easeLinear, hierarchy, interpolateWarm, pack, range, select } from "d3";
import { Data } from "./GraphData";

export function drawNetwork({ data, width, height, svgRef }: { data: Data, width: number, height: number, svgRef: any }) {
  const marginLeft = 10;
  const marginRight = 10;
  const marginTop = 10;
  const marginBottom = 10;
  const padding = 3;
  const stroke = null; // a static stroke around the bubbles
  const strokeWidth = null; // the stroke width around the bubbles, if any
  const strokeOpacity = null; //
  const fillOpacity = 0.7;
  const colors = interpolateWarm;

  const D = data.nodes.map((d) => d);

  const V = data.nodes.map((d) => d.value);

  const I = range(V.length).filter((i) => V[i] > 0);

  const root = pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)(hierarchy({ children: I }).sum((i) => V[i]));

  const nodes = select(svgRef.current).select("g.nodes");

  const leaf = nodes
    .selectAll("a")
    .data(root.leaves())
    .join(
      (enter: any) => {
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
      (update: any) => {
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
      (exit: any) => {
        exit.transition(easeLinear).duration(500).remove();
      }
    );
}

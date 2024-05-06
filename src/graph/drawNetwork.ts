import {
  easeLinear,
  hierarchy,
  interpolateWarm,
  pack,
  range,
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
  const stroke = null; // a static stroke around the bubbles
  const strokeWidth = null; // the stroke width around the bubbles, if any
  const strokeOpacity = null; //
  const fillOpacity = 0.7;
  const colors = interpolateWarm;

  const D = data.nodes.map((d) => d);
  console.log(D);

  // TODO: This d.id.length should instead use a value for the "importance" of a human factor
  // Array with the "values" of the nodes, in the end this affects the radius of the circles
  const V = data.nodes.map(() => 1);
  console.log(V);

  const I = range(V.length).filter((i) => V[i] > 0);
  console.log(I);

  const root = pack()
    .size([width - 20, height - 20])
    .padding(3)(hierarchy<any>({ children: I }).sum((i) => V[i]));

  // Create a new array and merge the data from D and root.leaves()
  const graphData = root.leaves().map((leaf, index) => {
    return {
      ...D[index], // spread the properties of the corresponding object in D
      ...leaf, // spread the properties of the leaf
    };
  });
  console.log(graphData);

  // Create a dictionary with 'id' as the key and the object itself as the value
  const nodesDict = graphData.reduce((acc, obj) => {
    acc[obj.id] = obj;
    return acc;
  }, {} as { [key: string]: (typeof graphData)[0] });
  console.log(nodesDict);

  select(svgRef.current)
    .select("g.nodes")
    .selectAll("a")
    .data(graphData)
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
          .attr("fill", (d: any) =>
            d.fullyMeasured ? colors(d.score) : "gray"
          )
          .attr("fill-opacity", fillOpacity)
          .attr("r", (d: any) => d.r);
        a.append("title").text((d: any) => `${d.title}`);
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
          .attr("fill", (d: any) =>
            d.fullyMeasured ? colors(d.score) : "gray"
          )
          .attr("fill-opacity", fillOpacity)
          .attr("r", (d: any) => d.r);
        update.append("title").text((d: any) => `${d.title}`);
      },
      (exit: any): void => {
        exit.transition(easeLinear).duration(500).remove();
      }
    );

  select(svgRef.current)
    .select("g.links")
    .selectAll("line")
    .data(data.links)
    .join(
      (enter: any): any => {
        const l = enter.append("line");
        l.transition(easeLinear)
          .delay(500)
          .duration(500)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("x1", (d: any) => nodesDict[d.source].x)
          .attr("y1", (d: any) => nodesDict[d.source].y)
          .attr("x2", (d: any) => nodesDict[d.target].x)
          .attr("y2", (d: any) => nodesDict[d.target].y);
      },
      (update: any): any => {
        update
          .transition(easeLinear)
          .delay(500)
          .duration(500)
          .attr("x1", (d: any) => nodesDict[d.source].x)
          .attr("y1", (d: any) => nodesDict[d.source].y)
          .attr("x2", (d: any) => nodesDict[d.target].x)
          .attr("y2", (d: any) => nodesDict[d.target].y);
      },
      (exit: any): void => {
        exit.transition(easeLinear).duration(500).style("opacity", 0).remove();
      }
    );
}

export interface Node extends d3.SimulationNodeDatum {
  id: string;
}

export type Data = {
  nodes: Node[];
};
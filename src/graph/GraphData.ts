export interface Node extends d3.SimulationNodeDatum {
  id: string;
  title: string;
}

export type Data = {
  nodes: Node[];
};
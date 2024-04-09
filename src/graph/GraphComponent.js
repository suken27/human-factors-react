import ScatterplotReactControlled from "./ScatterplotReactControlled";

const GraphComponent = (props) => {
  const margin = { top: 30, right: 10, bottom: 50, left: 60 };

  return (
    <ScatterplotReactControlled margin={margin} />
  );
};

export default GraphComponent;

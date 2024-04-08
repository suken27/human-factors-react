
const GraphComponent = (props) => {
  const margin = { top: 30, right: 10, bottom: 50, left: 60 };

  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className="row">
        <div className="col-9">
          <Rankings margin={margin} />
        </div>
        <div className="col-3">
          <div className="row">
            <div className="col-12">
              <ScatterplotD3Controlled margin={margin} />
            </div>
            <div className="col-12">
              <BarChart margin={margin} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GraphComponent;

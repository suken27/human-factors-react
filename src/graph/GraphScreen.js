import GraphComponent from "./GraphComponent";
import "./GraphScreen.css";

function GraphScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataURL =
      " https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json";
    let mounted = true;
    d3.json(dataURL).then((data) => {
      if (mounted) {
        setData(data);
        setLoading(false);
        console.log(data);
      }
    });
    return () => mounted = false;
  });

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <GraphComponent data={data} />}
    </div>
  )
}

export default GraphScreen;

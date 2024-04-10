import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../authentication/authHeader";
import GraphComponent from "./GraphComponent";
import "./GraphScreen.css";

const GraphScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataURL = "https://java.suken.io/humanfactor";
    let mounted = true;
    // TODO: Use the data properly
    axios
      .get(dataURL, { headers: authHeader() })
      .then((data) => {
        if (mounted) {
          setData(data);
          setLoading(false);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <GraphComponent data={data} />}
    </div>
  );
};

export default GraphScreen;

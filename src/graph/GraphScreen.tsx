import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../authentication/authHeader";
import { Data } from "./GraphData";
import "./GraphScreen.css";
import { Network } from "./Network";

const GraphScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const dataURL = "https://java.suken.io/humanfactor";
    let mounted = true;
    // TODO: Use the data properly
    axios
      .get(dataURL, { headers: authHeader() })
      .then((data) => {
        if (mounted) {
          const array: Data = {
            nodes: data.data,
          };
          setData(array);
          setLoading(false);
          // TODO: Remove the console.log
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container-full">
      {loading && <div className="loading">Loading...</div>}
      {!loading && data !== undefined && <Network data={data} />}
    </div>
  );
};

export default GraphScreen;

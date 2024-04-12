import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../authentication/authHeader";
import "./GraphScreen.css";
import { Network } from "./Network";

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
          const array = {
            nodes: data
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
    return () => (mounted = false);
  }, []);

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Network width={300} height={300} data={data.data} />}
    </div>
  );
};

export default GraphScreen;

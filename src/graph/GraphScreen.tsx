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
    axios
      .get(dataURL, { headers: authHeader() })
      .then((data) => {
        if (mounted) {
          // Build the link array using the affectsTo field
          const links = data.data.flatMap((node: any) =>
            node.affectsTo.map((affectedId: any) => ({
              source: node.id,
              target: affectedId,
            }))
          );
          // Build the data array that Network expects
          const array: Data = {
            nodes: data.data,
            links: links
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

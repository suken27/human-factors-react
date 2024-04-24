import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import authHeader from "../authentication/authHeader";
import { Data } from "./GraphData";
import "./GraphScreen.css";
import { Network } from "./Network";

const GraphScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>();
  const [width, setWidth] = useState<any>(null);
  const [height, setHeight] = useState<any>(null);

  const div = useCallback((node: any) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

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
    <div className="container-full" ref={div}>
      {loading && <div className="loading">Loading...</div>}
      {!loading && data !== undefined && (
        <Network width={width} height={height} data={data} />
      )}
    </div>
  );
};

export default GraphScreen;

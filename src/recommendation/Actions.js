import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../authentication/authHeader";
import "./Actions.css";

function Action({ title, description, score }) {
  return (
    <div className="Action">
      <div className="Action-title">{title} {score}</div>
      <div className="Action-description">{description}</div>
    </div>
  );
}

function ActionList({ actions }) {
  const rows = [];
    if (actions !== undefined) {
      actions.sort(function(a, b) {
        return b.score - a.score;
      });
      actions.forEach((action) => {
        rows.push(
          <Action
            title={action.title}
            score={action.score}
            description={action.description}
          />
        );
      });
    }
    return rows;
}

function ActionScreen() {
  const [actions, setActions] = useState([]);
  const [actionsRetrieveError, setActionsRetrieveError] = useState(false);
  const [anyActions, setAnyActions] = useState(false);

  useEffect(() => {
    axios
      .get("https://java.suken.io/teams/actions", { headers: authHeader() })
      .then((response) => {
        setActions(response.data);
        if(response.data === undefined || response.data.length === undefined || response.data.length === 0) {
          setAnyActions(false);
        } else {
          setAnyActions(true);
        }
      })
      .catch((error) => {
        setActionsRetrieveError(true);
        console.log(error);
      });
  }, []);

  return (
    <div className="Actions">
      <div className="error" hidden={!actionsRetrieveError}>
        <h3 className="error">Retrieve error</h3>
      </div>
      <div className="error" hidden={anyActions}>
        <h3 className="error">Incomplete team measurement</h3>
        <p>Your team does not have enough human factor measurements to provide any action recommendations. Keep answering daily questions and recommendations will start to appear.</p>
      </div>
      <div className="no-error" hidden={actionsRetrieveError || !anyActions}>
        <h3 className="Actions-title">Recommended actions</h3>
        <div className="Actions-list">
          <ActionList actions={actions} />
        </div>
      </div>
    </div>
  );
}

export default ActionScreen;

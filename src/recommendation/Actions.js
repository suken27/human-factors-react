import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../authentication/authHeader";
import "./Actions.css";

function Action({ title, description }) {
  return (
	<div className="Action">
	  <div className="Action-title">{title}</div>
	  <div className="Action-description">{description}</div>
	</div>
  );
}

function ActionScreen() {
  const [actions, setActions] = useState([]);
  const [actionsRetrieveError, setActionsRetrieveError] = useState(false);

  useEffect(() => {
    axios
      .get("https://java.suken.io/actions", { headers: authHeader() })
      .then((response) => {
        setActions(response.data.actions);
      })
      .catch((error) => {
        setActionsRetrieveError(true);
        console.log(error);
      });
  }, []);

  return (
    <div className="Actions">
      <div className="Actions-left">
        <h3 className="Actions-title">Human Factors</h3>
        <div className="Actions-left-factors">
          <div className="Actions-left-factors-item">
            <div className="Actions-left-factors-item-tag orange">
              &#128903;
            </div>{" "}
            Satisfaction
          </div>
          <div className="Actions-left-factors-item selected">
            <div className="Actions-left-factors-item-tag red">&#128903;</div>{" "}
            Technical and methodological skills
          </div>
          <div className="Actions-left-factors-item">
            <div className="Actions-left-factors-item-tag green">&#128903;</div>{" "}
            Motivation
          </div>
          <div className="Actions-left-factors-item">
            <div className="Actions-left-factors-item-tag green">&#128903;</div>{" "}
            Motivation
          </div>
        </div>
      </div>
      <div className="Actions-right">
        <h3 className="Actions-title">Recommended actions</h3>
        <div className="Actions-right-action">
          <div className="Actions-right-action-title">Member rotation</div>
          <div className="Actions-right-action-description">
            The inclusion of new team members fosters knowledge sharing from and
            towards the new members.
          </div>
        </div>
        <div className="Actions-right-action">
          <div className="Actions-right-action-title">Member rotation</div>
          <div className="Actions-right-action-description">
            The inclusion of new team members fosters knowledge sharing from and
            towards the new members.
          </div>
        </div>
        <div className="Actions-right-action">
          <div className="Actions-right-action-title">Member rotation</div>
          <div className="Actions-right-action-description">
            The inclusion of new team members fosters knowledge sharing from and
            towards the new members.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionScreen;

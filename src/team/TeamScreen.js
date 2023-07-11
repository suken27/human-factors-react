import axios from "axios";
import { useState } from "react";

function TeamScreen() {
  const client = axios.create({
    baseURL: "https://java.suken.io/team",
  });

  const [createdTeam, setCreatedTeam] = useState(false);

  return (
    <div className="TeamScreen">
      <div className="TeamScreen-noTeam" hidden={createdTeam}>
        NO TEAM CREATED
      </div>
      <div className="TeamScreen-displayTeam" hidden={!createdTeam}>
        DISPLAY TEAM
      </div>
    </div>
  );
}

export default TeamScreen;

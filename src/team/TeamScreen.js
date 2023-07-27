import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import authHeader from "../authentication/authHeader";
import trash from "../svg/trash.svg";
import "./TeamScreen.css";

function TeamMember({ email, members, setMembers }) {

  function handleRemove() {
    const postHeaders = authHeader();
    postHeaders["Content-Type"] = "text/plain";
    axios
      .delete("https://java.suken.io/teams/" + email, {
        headers: postHeaders,
      })
      .then((response) => {
        setMembers(members.filter((value) => {return value.email !== email}));
      })
      .catch((error) => {
        // TODO: Report error.
        console.log(error);
      });
  }

  return(
      <div className="TeamMember">
          <div className="TeamMember-email">
              {email}
          </div>
          <div className="TeamMember-remove">
              <button className="TeamMember-remove-button" onClick={handleRemove}>
                  <img src={trash} className="TeamMember-remove-button-image" alt="remove member" />
              </button>
          </div>
      </div>
  );
}

function TeamScreen() {
  const [members, setMembers] = useState([]);
  const [teamRetrieveError, setTeamRetrieveError] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [emailFormatError, setEmailFormatError] = useState(false);

  function handleNewMember(e) {
    e.preventDefault();
    if (!validator.isEmail(newMemberEmail)) {
      setEmailFormatError(true);
      return;
    }
    // TODO: Check that the email is not between the listed emails.
    setEmailFormatError(false);

    const postHeaders = authHeader();
    postHeaders["Content-Type"] = "text/plain";
    axios
      .post("https://java.suken.io/teams", newMemberEmail, {
        headers: postHeaders,
      })
      .then((response) => {
        setMembers(response.data);
        setNewMemberEmail("");
      })
      .catch((error) => {
        // TODO: Report error.
        console.log(error);
      });
  }

  function handleNewMemberEmailChange(e) {
    setNewMemberEmail(e.target.value);
  }

  function ListMembers() {
    const rows = [];
    if (members !== undefined) {
      members.forEach((member) => {
        rows.push(<TeamMember email={member.email} key={member.id} members={members} setMembers={setMembers} />);
      });
    }
    return rows;
  }

  useEffect(() => {
    axios
      .get("https://java.suken.io/teams", { headers: authHeader() })
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        setTeamRetrieveError(true);
        console.log(error);
      });
  }, []);

  return (
    <div className="TeamScreen">
      <div className="TeamScreen-members">
        <h2>Team members</h2>
        <div
          className="TeamScreen-members-retriveError"
          hidden={!teamRetrieveError}
        >
          Team retrieve error
        </div>
        <div
          className="TeamScreen-members-noMembersMessage"
          hidden={members.length !== 0}
        >
          Your team has no members yet
        </div>
        <div className="TeamScreen-members-list" hidden={members.length === 0}>
          <ListMembers />
        </div>
      </div>
      <div className="TeamScreen-management">
        <form
          className="TeamScreen-management-newMember-form"
          onSubmit={handleNewMember}
        >
          <div
            className="TeamScreen-management-newMember-form-errorMessage"
            hidden={!emailFormatError}
          >
            Incorrect email format.
          </div>
          <input
            className="TeamScreen-management-newMember-form-input"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={newMemberEmail}
            onChange={handleNewMemberEmailChange}
          />
          <button
            type="submit"
            className="TeamScreen-management-newMember-form-button"
          >
            Add team member
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeamScreen;

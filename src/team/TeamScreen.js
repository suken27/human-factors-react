import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import authHeader from "../authentication/authHeader";
import trash from "../svg/trash.svg";
import "./TeamScreen.css";

function TeamMember({ email, members, setMembers, setMemberRemovalError }) {
  function handleRemove() {
    setMemberRemovalError(false);
    const postHeaders = authHeader();
    postHeaders["Content-Type"] = "text/plain";
    axios
      .delete("https://java.suken.io/teams/" + email, {
        headers: postHeaders,
      })
      .then((response) => {
        setMembers(
          members.filter((value) => {
            return value.email !== email;
          })
        );
      })
      .catch((error) => {
        setMemberRemovalError(true);
        console.log(error);
      });
  }

  return (
    <div className="TeamMember">
      <div className="TeamMember-email">{email}</div>
      <div className="TeamMember-remove">
        <button className="TeamMember-remove-button" onClick={handleRemove}>
          <img
            src={trash}
            className="TeamMember-remove-button-image"
            alt="remove member"
          />
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
  const [existingMemberError, setExistingMemberError] = useState(false);
  const [memberCreationError, setMemberCreationError] = useState(false);
  const [memberRemovalError, setMemberRemovalError] = useState(false);
  const [questionTime, setQuestionTime] = useState("");

  function handleNewMember(e) {
    e.preventDefault();
    if (!validator.isEmail(newMemberEmail)) {
      setEmailFormatError(true);
      return;
    }
    if (
      members.find((element) => element.email === newMemberEmail) !== undefined
    ) {
      setExistingMemberError(true);
      return;
    }
    setEmailFormatError(false);
    setExistingMemberError(false);
    setMemberCreationError(false);
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
        setMemberCreationError(true);
        console.log(error);
      });
  }

  function handleNewMemberEmailChange(e) {
    setNewMemberEmail(e.target.value);
  }

  function handleQuestionTimeChange(e) {
    setQuestionTime(e.target.value);
    const postHeaders = authHeader();
    postHeaders["Content-Type"] = "text/plain";
    axios
      .put("https://java.suken.io/teams/time", e.target.value, {
        headers: postHeaders,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function ListMembers() {
    const rows = [];
    if (members !== undefined) {
      members.forEach((member) => {
        rows.push(
          <TeamMember
            email={member.email}
            key={member.id}
            members={members}
            setMembers={setMembers}
            setMemberRemovalError={setMemberRemovalError}
          />
        );
      });
    }
    return rows;
  }

  useEffect(() => {
    axios
      .get("https://java.suken.io/teams", { headers: authHeader() })
      .then((response) => {
        setMembers(response.data.members);
        setQuestionTime(response.data.questionSendingTime);
      })
      .catch((error) => {
        setTeamRetrieveError(true);
        console.log(error);
      });
  }, []);

  return (
    <div className="TeamScreen">
      <div className="TeamScreen-members individual">
        <h2 className="TeamScreen-members-title">Team members</h2>
        <div className="TeamScreen-members-error" hidden={!teamRetrieveError}>
          Team retrieve error
        </div>
        <div className="TeamScreen-members-error" hidden={!existingMemberError}>
          The email is already registered as a team member
        </div>
        <div className="TeamScreen-members-error" hidden={!memberCreationError}>
          An unexpected error ocurred on member creation
        </div>
        <div className="TeamScreen-members-error" hidden={!memberRemovalError}>
          An unexpected error ocurred on member removal
        </div>
        <div
          className="TeamScreen-members-noMembersMessage"
          hidden={members.length !== 0 || teamRetrieveError}
        >
          Your team has no members yet
        </div>
        <div className="TeamScreen-members-list" hidden={members.length === 0}>
          <ListMembers />
        </div>
        <form
          className="TeamScreen-members-newMember-form"
          onSubmit={handleNewMember}
        >
          <div
            className="TeamScreen-members-newMember-form-errorMessage"
            hidden={!emailFormatError}
          >
            Incorrect email format.
          </div>
          <input
            className="TeamScreen-members-newMember-form-input"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={newMemberEmail}
            onChange={handleNewMemberEmailChange}
          />
          <button
            type="submit"
            className="TeamScreen-members-newMember-form-button"
          >
            Add team member
          </button>
        </form>
      </div>
      <div className="TeamScreen-management">
        <div className="TeamScreen-management-slack individual">
          <div className="TeamScreen-management-slack-left">
            <div className="TeamScreen-management-timeSetting-left-description">
              <h2>Slack integration</h2>
              <p>Click the button to add the Slack App to your workspace. This button will redirect you to another page that generates a secured 'add to slack' button.</p>
            </div>
          </div>
          <div className="TeamScreen-management-slack-middle"></div>
          <div className="TeamScreen-management-slack-right">
            <div className="TeamScreen-management-slack-right-button">
              <a href="https://java.suken.io/slack/install">
                <img
                  alt="Add to Slack"
                  height="40"
                  width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="TeamScreen-management-timeSetting individual">
          <div className="TeamScreen-management-timeSetting-left">
            <div className="TeamScreen-management-timeSetting-left-description">
              <h2>Question sending time</h2>
              <p>
                Set the time at which the questions for human factor measurement
                will be sent from Monday to Friday. Questions will be sent only
                once per day.
              </p>
            </div>
          </div>
          <div className="TeamScreen-management-timeSetting-middle"></div>
          <div className="TeamScreen-management-timeSetting-right">
            <div className="TeamScreen-management-timeSetting-right-time">
              <input
                className="TeamScreen-management-timeSetting-right-time-input"
                type="time"
                id="questionTime"
                name="questionTime"
                value={questionTime}
                onInput={handleQuestionTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamScreen;

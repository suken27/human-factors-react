import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import AuthService from "../authentication/AuthService";
import authHeader from "../authentication/authHeader";
import "./TeamScreen.css";

interface TeamMemberProps {
	email: string;
	members: any[]; // Replace 'any' with the appropriate type for the 'members' prop
	setMembers: any; // Replace 'any' with the appropriate type for the 'setMembers' prop
	setMemberRemovalError: (error: boolean) => void; // Replace 'any' with the appropriate type for the 'setMemberRemovalError' prop
}

const TeamMember = ({ email, members, setMembers, setMemberRemovalError }: TeamMemberProps) => {

	const {default: trash} = require("../svg/trash.svg") as {default: string};

	function handleRemove() {
		setMemberRemovalError(false);
		const postHeaders = authHeader();
		postHeaders['Content-Type'] = "text/plain";
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

export const TeamScreen = () => {
	const [members, setMembers] = useState([]);
	const [teamRetrieveError, setTeamRetrieveError] = useState(false);
	const [newMemberEmail, setNewMemberEmail] = useState("");
	const [emailFormatError, setEmailFormatError] = useState(false);
	const [existingMemberError, setExistingMemberError] = useState(false);
	const [memberCreationError, setMemberCreationError] = useState(false);
	const [memberRemovalError, setMemberRemovalError] = useState(false);
	const [questionTime, setQuestionTime] = useState("");
	const [integrationCompleted, setIntegrationCompleted] = useState(false);

	function handleNewMember(e : any) {
		if (!validator.isEmail(newMemberEmail)) {
			setEmailFormatError(true);
			return;
		}
		if (
			members.find((element: { email: string }) => element.email === newMemberEmail) !== undefined
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

	function handleNewMemberEmailChange(e : any) {
		setNewMemberEmail(e.target.value);
	}

	function handleQuestionTimeChange(e : any) {
		setQuestionTime(e.target.value);
		const postHeaders = authHeader();
		postHeaders["Content-Type"] = "text/plain";
		axios
			.put("https://java.suken.io/teams/time", e.target.value, {
				headers: postHeaders,
			})
			.then((response) => {
				setIntegrationCompleted(response.data)
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function ListMembers() : any {
		const rows : any = [];
		if (members !== undefined) {
			members.forEach((member : any) => {
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
				if (error.response && error.response.status === 401) {
					AuthService.logout();
					window.location.href = "/login";
					return;
				}
				setTeamRetrieveError(true);
				console.log(error);
			});
		axios.get("https://java.suken.io/user/integration", { headers: authHeader() })
			.then((response) => {
				setIntegrationCompleted(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="TeamScreen page">
			<div className="TeamScreen-members individual">
				<h2>Team members</h2>
				<div className="TeamScreen-members-error" hidden={!teamRetrieveError}>
					Team retrieve error.
				</div>
				<div className="TeamScreen-members-error" hidden={!existingMemberError}>
					The email is already registered as a team member.
				</div>
				<div className="TeamScreen-members-error" hidden={!memberCreationError}>
					An unexpected error ocurred on member creation.
				</div>
				<div className="TeamScreen-members-error" hidden={!memberRemovalError}>
					An unexpected error ocurred on member removal.
				</div>
				<div
					className="TeamScreen-members-noMembersMessage"
					hidden={members.length !== 0 || teamRetrieveError}
				>
					Your team has no members yet.
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
			<div className="individual">
				<div className="individual-left">
					<h2>Slack integration</h2>
					<p hidden={integrationCompleted}>
						<b>Slack integration has not been completed.</b> Slack is necessary to send the human factor questions to team members. Click the button to add the Slack App to your workspace. This
						button will redirect you to another page that generates a secured
						'add to slack' button.
					</p>
					<p hidden={!integrationCompleted}>
						Slack integration has been completed.
					</p>
				</div>
				<div className="individual-middle" hidden={integrationCompleted} />
				<div className="individual-right" hidden={integrationCompleted} >
					<a className="centered" href="https://java.suken.io/slack/install">
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
			<div className="individual">
				<div className="individual-left">
					<h2>Question sending time</h2>
					<p>
						Set the time at which the questions for human factor measurement
						will be sent from Monday to Friday. Questions will be sent only
						once per day.
					</p>
				</div>
				<div className="individual-middle"></div>
				<div className="individual-right">
					<div className="centered">
						<input
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
	);
}

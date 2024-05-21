import axios from "axios";
import { useState } from "react";
import AuthService from "../authentication/AuthService";
import authHeader from "../authentication/authHeader";

function SettingsScreen() {

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	const [passwordsDoNotMatchError, setPasswordsDoNotMatchError] = useState(false);
	const [emptyFieldError, setEmptyFieldError] = useState(false);
	const [passwordChangeError, setPasswordChangeError] = useState(false);
	const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

	function handleOldPasswordChange(event) {
		setOldPassword(event.target.value);
	}

	function handleNewPasswordChange(event) {
		setNewPassword(event.target.value);
	}

	function handleNewPasswordConfirmChange(event) {
		setNewPasswordConfirm(event.target.value);
	}

	function handleChangePassword(event) {
		event.preventDefault();
		setPasswordChangeError(false);
		setPasswordChangeSuccess(false);
		setPasswordsDoNotMatchError(false);
		setEmptyFieldError(false);
		if(oldPassword === "" || newPassword === "" || newPasswordConfirm === "") {
			setEmptyFieldError(true);
			return;
		}
		if (newPassword !== newPasswordConfirm) {
			setPasswordsDoNotMatchError(true);
			return;
		}
		const postHeaders = authHeader();
		postHeaders["Content-Type"] = "application/json";
		axios.put("https://java.suken.io/user/password", "{\"oldPassword\":\"" + oldPassword + "\",\"newPassword\":\"" + newPassword + "\"}", { headers: postHeaders })
			.then(response => {
				setPasswordChangeSuccess(true);
				setOldPassword("");
				setNewPassword("");
				setNewPasswordConfirm("");
			}).catch(error => {
				if(error.response.status === 401) {
					AuthService.logout();
					window.location.href = "/login";
					return;
				}
				setPasswordChangeError(true);
			});
	}

	return (
		<div className="SettingsScreen page-no-grow">
			<h1 className="title">Settings</h1>
			<div className="individual">
				<div className="individual-left">
					<h2>Email</h2>
					<p>{AuthService.getCurrentUser()}</p>
				</div>
			</div>
			<div className="individual multi-input">
				<h2 className="multi-input-full">Change password</h2>
				<form onSubmit={handleChangePassword}>
					<div className="multi-input-half">
						<span className="multi-input-half-left">Old password</span>
						<div className="multi-input-half-middle" />
						<div className="multi-input-half-right">
							<input type="password" value={oldPassword} onChange={handleOldPasswordChange} />
						</div>
					</div>
					<div className="multi-input-sep" />
					<div className="multi-input-half">
						<span className="multi-input-half-left">New password</span>
						<div className="multi-input-half-middle" />
						<div className="multi-input-half-right">
							<input type="password" value={newPassword} onChange={handleNewPasswordChange} />
						</div>
					</div>
					<div className="multi-input-sep" />
					<div className="multi-input-half">
						<span className="multi-input-half-left">Confirm password</span>
						<div className="multi-input-half-middle" />
						<div className="multi-input-half-right">
							<input type="password" value={newPasswordConfirm} onChange={handleNewPasswordConfirmChange} />
						</div>
					</div>
					<div className="multi-input-sep" />
					<div className="multi-input-full">
						<div className="multi-input-messages">
							<span className="multi-input-error" hidden={!passwordsDoNotMatchError}>Error: Passwords do not match</span>
							<span className="multi-input-error" hidden={!passwordChangeError}>Error: Couldn't reach server</span>
							<span className="multi-input-error" hidden={!emptyFieldError}>Error: No field can be empty</span>
							<span className="multi-input-success" hidden={!passwordChangeSuccess}>Password changed successfully</span>
						</div>
						<button className="multi-input-button" type="submit">Save</button>
					</div>
				</form>
			</div>
		</div>
	);

}

export default SettingsScreen;
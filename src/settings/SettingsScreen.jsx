import { useState } from "react";
import AuthService from "../authentication/AuthService";

function SettingsScreen() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    function handleOldPasswordChange(event) {
        setOldPassword(event.target.value);
    }

    function handleNewPasswordChange(event) {
        setNewPassword(event.target.value);
    }

    function handleNewPasswordConfirmChange(event) {
        setNewPasswordConfirm(event.target.value);
    }

    function handleSubmit(event) {
        if(newPassword !== newPasswordConfirm) {
            alert("Passwords do not match");
            return;
        }
    }

    return (
        <div className="SettingsScreen">
            <h1 className="title">Settings</h1>
            <div className="individual">
                <div className="individual-left">
                    <h2>Email</h2>
                    <p>{AuthService.getCurrentUser()}</p>
                </div>
            </div>
            <div className="individual multi-input">
                <h2 className="multi-input-full">Change password</h2>
                <form>
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
                        <button className="multi-input-button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default SettingsScreen;
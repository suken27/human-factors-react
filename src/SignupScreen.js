import logo from './logo.svg'
import users from './users.svg'
import './SignupScreen.css'

export default function SignupScreen() {
    return (
        <div className="SignupScreen">
            <div className="SignupScreen-left">
                <img src={logo} className='SignupScreen-left-icon' />
            </div>
            <div className="SignupScreen-middle">

            </div>
            <div className="SignupScreen-right">
                <img src={users} className='SignupScreen-right-icon' />
                <form className="SignupScreen-right-signup-form">
                    <input className='SignupScreen-right-signup-form-input' type='text' id='username' name='username' placeholder='Username' />
                    <input className='SignupScreen-right-signup-form-input' type='password' id='password' name='password' placeholder='Password' />
                    <input className='SignupScreen-right-signup-form-input' type='password' id='repeat-password' name='repeat-password' placeholder='Repeat password' />
                    <button type='submit' className='SignupScreen-right-signup-form-button'>Sign up</button>
                </form>
            </div>
        </div>
    );
}
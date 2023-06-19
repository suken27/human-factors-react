import './LoginScreen.css';
import logo from './logo.svg';
import users from './users.svg';

export default function LoginScreen() {
    return (
        <div className="LoginScreen">
            <div className="LoginScreen-left">
                <img src={logo} className='LoginScreen-left-icon'/>
            </div>
            <div className="LoginScreen-middle">

            </div>
            <div className="LoginScreen-right">
                <img src={users} className='LoginScreen-right-icon'/>
                <form className="LoginScreen-right-login-form">
                    <input className='LoginScreen-right-login-form-input' type='text' id='username' name='username' placeholder='Username'/>
                    <input className='LoginScreen-right-login-form-input' type='password' id='password' name='password' placeholder='Password'/>
                    <button type='submit' className='LoginScreen-right-login-form-button'>Login</button>
                </form>
                <div className='LoginScreen-right-signup'>
                    <p>Not a member?</p><a className='LoginScreen-right-signup-button' href='/signup'>Sign up</a>
                </div>
            </div>
        </div>

    );
}
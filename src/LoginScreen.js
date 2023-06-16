import './LoginScreen.css'
import users from './users.svg'

function LoginScreen() {
    return (
        <div className="LoginScreen">
            <div className="LoginScreen-left">

            </div>
            <div className="LoginScreen-middle">

            </div>
            <div className="LoginScreen-right">
                <img src={users} className='LoginScreen-right-icon'/>
                <div className="LoginScreen-right-login-form">

                </div>
            </div>
        </div>
    );
}
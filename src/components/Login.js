import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = () => {
        console.log('제출');
    };

    const onChangeEmail = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onClickLogin = () => {};

    return (
        <div id="membership">
            <div className="memberBox">
                <form onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input data-testid="email-input" value={email} onChange={onChangeEmail} />
                    <br />
                    <label>Password</label>
                    <input type="password" data-testid="password-input" value={password} onChange={onChangePassword} />
                    <br />
                    <button data-testid="signin-button" className="btnPrimary" onClick={onClickLogin}>
                        로그인
                    </button>
                </form>
                <Link to="/signup" className="btnGoJoin">
                    회원가입
                </Link>
            </div>
        </div>
    );
}

export default Login;

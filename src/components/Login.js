import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [activeButton, setActiveButton] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    // 이메일 조건 검사: '@' 포함
    const validEmail = () => {
        const isValid = email.includes('@');
        setIsValidEmail(isValid);
    };
    // 비밀번호 8자 이상
    const validPassword = (e) => {
        const isValid = password.length >= 8;
        setIsValidPassword(isValid);
    };

    // 로그인
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                //console.log(res);
                return res.json();
            })
            .then((res) => {
                //console.log(res);

                // 로그인 성공
                if (res.access_token) {
                    const accessToken = res.access_token;
                    localStorage.setItem('user', accessToken);
                    navigate('/todo');
                }

                // 로그인 실패
                if (res.statusCode === 401) {
                    setLoginError(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // 이메일, 비밀번호 유효성 검사
    useEffect(() => {
        validEmail();
        validPassword();
        setLoginError(false);
    }, [email, password]);

    // 버튼 활성화
    useEffect(() => {
        if (isValidEmail && isValidPassword) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [isValidEmail, isValidPassword]);

    return (
        <div id="membership">
            <h1>로그인</h1>
            <div className="memberBox">
                <form onSubmit={onSubmitHandler}>
                    <label>이메일</label>
                    <input
                        data-testid="email-input"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isValidEmail && <p className="errorTxt">이메일 주소는 @를 포함하여 입력해주세요.</p>}
                    <br />
                    <label>비밀번호</label>
                    <input
                        type="password"
                        data-testid="password-input"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isValidPassword && <p className="errorTxt">비밀번호는 8자 이상으로 입력해주세요.</p>}
                    {loginError && <p className="errorTxt">이메일/비밀번호가 맞지 않습니다.</p>}
                    <br />
                    <button type="submit" data-testid="signin-button" className="btnPrimary" disabled={!activeButton}>
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

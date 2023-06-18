import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [activeButton, setActiveButton] = useState(false);
    const [joinErrorTxt, setJoinErrorTxt] = useState(null);

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

    // 회원가입
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                //console.log(res);

                // 회원가입 성공
                if (res.status === 201) {
                    navigate('/signin');
                }

                return res.json();
            })
            .then((res) => {
                //console.log(res);

                // 회원가입 실패
                if (res.statusCode === 400) {
                    setJoinErrorTxt(res.message);
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
        setJoinErrorTxt(null);
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
            <h1>회원가입</h1>
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
                    {joinErrorTxt && <p className="errorTxt">{joinErrorTxt}</p>}
                    <br />
                    <button type="submit" data-testid="signup-button" className="btnPrimary" disabled={!activeButton}>
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Join;

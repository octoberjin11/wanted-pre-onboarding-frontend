import React, {useState} from 'react';

function Join() {
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    });
    const {email, password} = inputValue;
    const [activeButton, setActiveButton] = useState(false);

    const onHandleInput = (event) => {
        const {name, value} = event.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    };

    // 이메일 조건 검사: '@' 포함
    const isValidEmail = email.includes('@');
    // 비밀번호 8자 이상
    const isValidPassword = password.length >= 8;

    const onSubmitHandler = () => {
        console.log('제출');
    };

    return (
        <div id="membership">
            <div className="memberBox">
                <form onSubmit={onSubmitHandler}>
                    <label>이메일</label>
                    <input data-testid="email-input" name="email" value={email} onChange={onHandleInput} />
                    <br />
                    <label>비밀번호</label>
                    <input
                        type="password"
                        data-testid="password-input"
                        name="password"
                        value={password}
                        onChange={onHandleInput}
                    />
                    <br />
                    <button type="button" data-testid="signup-button" className="btnPrimary" disabled={!activeButton}>
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Join;

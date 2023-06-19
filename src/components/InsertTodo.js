import React, {useState, useCallback, useRef, useEffect} from 'react';

function InsertTodo({bearerToken}) {
    const [insertValue, setInsertValue] = useState('');
    const inputRef = useRef(null);

    const insertTodo = useCallback((e) => {
        setInsertValue(e.target.value);
    }, []);

    const onSubmitTodo = useCallback(
        (e) => {
            e.preventDefault();
            setInsertValue(''); //TODO 입력창 초기화
            inputRef.current.focus(); //TODO 입력창 커서 이동

            const payload = {
                todo: insertValue
            };

            fetch('https://www.pre-onboarding-selection-task.shop/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: bearerToken
                },
                body: JSON.stringify(payload)
            })
                .then((res) => {
                    //console.log(res);
                    return res.json();
                })
                .then((res) => {
                    //console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [insertValue]
    );

    useEffect(() => {
        //첫 렌더링시 일정 입력창으로 자동 커서 이동
        inputRef.current.focus();
    }, []);

    return (
        <div className="todoWrap">
            <div className="todoInsertBox">
                <form onSubmit={onSubmitTodo}>
                    <input
                        data-testid="new-todo-input"
                        onChange={insertTodo}
                        value={insertValue}
                        placeholder="일정을 입력해주세요."
                        ref={inputRef}
                    />
                    <button data-testid="new-todo-add-button">추가</button>
                </form>
            </div>
        </div>
    );
}

export default InsertTodo;

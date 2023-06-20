import React, {useCallback, useState} from 'react';

function TodoListItem({todo, postUpdateTodo}) {
    const [value, setValue] = useState(todo.todo);
    const [completed, setCompleted] = useState(todo.isCompleted);
    const [isModify, setIsModify] = useState(false); //수정 버튼 클릭 여부

    const id = todo.id;

    //체크박스 상태
    const checkboxStatus = useCallback(
        (e) => {
            const isChecked = e.target.checked;
            setCompleted(isChecked);
            if (isModify === false) postUpdateTodo(id, value, isChecked);
        },
        [completed, isModify]
    );

    //수정 버튼
    const modifyTodo = useCallback(() => {
        setIsModify(true);
    }, []);

    //제출 버튼
    const updateTodo = useCallback(() => {
        if (value === '') {
            alert('수정할 내용을 입력하세요');
        } else {
            if (value !== todo.todo || completed !== todo.isCompleted) postUpdateTodo(id, value, completed);
            setIsModify(false);
        }
    }, [value, completed]);

    //취소 버튼
    const cancelTodo = useCallback(() => {
        setValue(todo.todo);
        setCompleted(todo.isCompleted);
        setIsModify(false);
    }, [todo.todo, todo.isCompleted]);

    return (
        <li className={`todoList ${completed ? 'done' : ''}`}>
            <label>
                <input type="checkbox" id={id} checked={completed} onChange={checkboxStatus} />
                {isModify ? (
                    <input
                        data-testid="modify-input"
                        className="modifyInput"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                ) : (
                    <>
                        <span className="txt">{value}</span>
                    </>
                )}
            </label>
            <div className="btnArea">
                {isModify ? (
                    <>
                        <button data-testid="submit-button" onClick={updateTodo}>
                            제출
                        </button>
                        <button data-testid="cancel-button" onClick={cancelTodo}>
                            취소
                        </button>
                    </>
                ) : (
                    <>
                        <button data-testid="modify-button" onClick={modifyTodo}>
                            수정
                        </button>
                        <button data-testid="delete-button">삭제</button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TodoListItem;

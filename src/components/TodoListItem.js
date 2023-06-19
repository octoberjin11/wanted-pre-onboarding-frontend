import React, {useState} from 'react';

function TodoListItem({todo}) {
    const [completed, setCompleted] = useState(todo.isCompleted);

    const checkboxStatus = (e) => {
        setCompleted(e.target.checked);
    };

    return (
        <li className="todoList">
            <label>
                <input type="checkbox" id={todo.id} checked={completed} onChange={checkboxStatus} />
                <span className="txt">{todo.todo}</span>
            </label>
            <div className="btnArea">
                <button data-testid="modify-button">수정</button>
                <button data-testid="delete-button">삭제</button>
            </div>
        </li>
    );
}

export default TodoListItem;

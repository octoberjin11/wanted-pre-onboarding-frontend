import React from 'react';
import InsertTodo from './InsertTodo';

function Todo() {
    const user = localStorage.getItem('user');
    const bearerToken = `Bearer ${user}`;

    return (
        <div id="myTodo">
            <h1>일정관리</h1>

            {/* TODO 입력창 */}
            <InsertTodo bearerToken={bearerToken} />
        </div>
    );
}

export default Todo;

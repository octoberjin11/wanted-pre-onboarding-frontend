import React, {useState, useCallback, useEffect} from 'react';
import InsertTodo from './InsertTodo';
import TodoList from './TodoList';

function Todo() {
    //TODO List
    const [todos, setTodos] = useState([]);

    const user = localStorage.getItem('user');
    const bearerToken = `Bearer ${user}`;

    //TODO 리스트 받아오기
    const getTodoList = useCallback(() => {
        fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'GET',
            headers: {
                Authorization: bearerToken
            }
        })
            .then((res) => {
                //console.log(res);
                return res.json();
            })
            .then((res) => {
                //console.log(res);
                setTodos(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [todos]);

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <div id="myTodo">
            <h1>일정관리</h1>

            <div className="todoWrap">
                {/* TODO 입력창 */}
                <InsertTodo bearerToken={bearerToken} setTodos={setTodos} />

                {/* TODO 리스트 */}
                <TodoList todos={todos} />
            </div>
        </div>
    );
}

export default Todo;

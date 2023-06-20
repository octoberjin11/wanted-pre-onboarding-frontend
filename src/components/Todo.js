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

    //TODO 리스트 수정
    const updateTodoList = useCallback((id, todo, isCompleted) => {
        const payload = {
            todo: todo,
            isCompleted: isCompleted
        };

        fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearerToken
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                //console.log(res);

                // 투두 수정 성공
                if (res.status === 200) {
                    getTodoList();
                }

                return res.json();
            })
            .then((res) => {
                //console.log(res);

                if (res.statusCode) {
                    alert(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //TODO 리스트 삭제
    const deleteTodoList = useCallback((id) => {
        fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearerToken
            }
        })
            .then((res) => {
                //console.log(res);

                // 투두 삭제 성공
                if (res.status === 204) {
                    getTodoList();
                }

                return res.json();
            })
            .then((res) => {
                //console.log(res);

                if (res.statusCode) {
                    alert(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                <TodoList todos={todos} updateTodoList={updateTodoList} deleteTodoList={deleteTodoList} />
            </div>
        </div>
    );
}

export default Todo;

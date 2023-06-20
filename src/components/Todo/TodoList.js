import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({todos, updateTodoList, deleteTodoList}) {
    return (
        <div className="todoCon">
            <ul className="todoListWrap">
                {todos.map((todo) => {
                    return (
                        <TodoListItem
                            todo={todo}
                            key={todo.id}
                            updateTodoList={updateTodoList}
                            deleteTodoList={deleteTodoList}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;

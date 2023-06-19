import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({todos}) {
    return (
        <div className="todoCon">
            <ul className="todoListWrap">
                {todos.map((todo) => {
                    return <TodoListItem todo={todo} key={todo.id} />;
                })}
            </ul>
        </div>
    );
}

export default TodoList;

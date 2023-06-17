import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Join from './components/Join';
import Todo from './components/Todo';

function AppRoutes() {
    const pathList = [
        {
            path: '/signin',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Join />
        },
        {
            path: '/todo',
            element: <Todo />
        }
    ];

    return (
        <Routes>
            {pathList.map((v, idx) => {
                return <Route key={idx} path={v?.path} element={v?.element} />;
            })}
        </Routes>
    );
}

export default AppRoutes;

import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Todo from '../pages/Todo';
import {PrivateRoute} from './PrivateRoute';

function AppRoutes() {
    // 로그인 여부 확인
    const user = localStorage.getItem('user');

    // path
    const pathList = [
        {
            path: '/signin',
            element: <Login />,
            isLogin: false
        },
        {
            path: '/signup',
            element: <Join />,
            isLogin: false
        },
        {
            path: '/todo',
            element: <Todo />,
            isLogin: true
        }
    ];

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            {pathList.map((v, idx) => {
                if (v.isLogin) {
                    return <Route key={idx} path={v?.path} element={<PrivateRoute children={v?.element} />} />;
                } else {
                    return (
                        <Route key={idx} path={v?.path} element={user ? <Navigate replace to="/todo" /> : v?.element} />
                    );
                }
            })}
        </Routes>
    );
}

export default AppRoutes;

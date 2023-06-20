import {Navigate} from 'react-router-dom';

export {PrivateRoute};

function PrivateRoute({children}) {
    const user = localStorage.getItem('user');

    if (!user) {
        //로그인 페이지로 이동
        return <Navigate to="/signin" />;
    } else {
        //페이지로 이동
        return children;
    }
}

import { Navigate } from 'react-router-dom';
function PrivateRoute({ children }) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        // Redirect to the login page.
        console.log("access token not found")
        return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;

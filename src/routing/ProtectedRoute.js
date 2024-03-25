import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {

    const token = localStorage.getItem('token');
    const  navigate = useNavigate();

    if (!token) {
        return<Navigate to="/login" />;
    }

    return (
        props.child
    );
}
 
export default ProtectedRoute;
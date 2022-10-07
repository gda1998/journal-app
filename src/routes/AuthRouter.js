import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    const authData = useSelector( state => state.auth );
    return Object.keys(authData).length > 0 
    ? <Navigate to="/" replace /> 
    : (
        <div className="auth__main">
            <div className="auth__box-container">
                <Routes>
                    <Route path="/login" element={ <LoginScreen /> } />
                    <Route path="/register" element={ <RegisterScreen /> } />
                    <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                </Routes>
            </div>{/* /.auth__box-container */}
        </div>/* /.auth__main */
    );
}
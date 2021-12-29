import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
        email: 'gabriel@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = e => {
        e.preventDefault();
        dispatch( login(1234, 'Hernando') );   
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handleLogin }>

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <button type="submit" className="btn btn-primary btn-block">
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>{/* /.google-btn */}
                </div>{/* /.auth__social-networks */}

                <Link to="/auth/register" className="link">
                    Create a new account
                </Link>

            </form>
        </>
    );
}

import React from 'react';
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form>

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                    name="email"
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm"
                    name="password2"
                />
                <button type="submit" className="btn btn-primary btn-block mb-5">
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>

            </form>
        </>
    );
}

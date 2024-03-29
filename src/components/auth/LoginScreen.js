import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    // gabriel@gmail.com, 123456
    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = e => {
        e.preventDefault();
        dispatch( startLoginEmailPassword({email, password}) );
    }

    const handleGoogleLogin = () => dispatch( startGoogleLogin() );

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={ handleLogin }
            >

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
                <button 
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                    type="submit" 
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
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
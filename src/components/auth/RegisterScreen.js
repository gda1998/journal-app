import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { startRegisterAction } from '../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/ui';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui );
    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        isFormValid() && dispatch( startRegisterAction(formValues) );
    }

    const isFormValid = () => {
        if( !validator.isEmail(email) ){
            dispatch( setErrorAction('Email Invalid') );
            return false;
        }
        if( password !== password2 || password.length < 6 ){
            dispatch( setErrorAction('Password should be at least 6 characters and match each other') );
            return false;
        }
        dispatch( removeErrorAction() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={ handleRegister }
            >
                {
                    msgError && 
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                }

                <input
                    autoComplete="off"
                    className="auth__input"
                    maxLength={255}
                    name="name"
                    onChange={ handleInputChange }
                    pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*"
                    placeholder="Name"
                    required
                    title="El campo debe tener solamente caracteres alfabéticos."
                    type="text"
                    value={ name }
                />

                <input
                    autoComplete="off"
                    className="auth__input"
                    maxLength={255}
                    name="email"
                    onChange={ handleInputChange }
                    pattern="[a-zA-Z0-9_]+([.\-][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                    placeholder="Email"
                    required
                    title="ej. example@email.com"
                    type="email"
                    value={ email }
                />
                <input
                    className="auth__input"
                    minLength={ 6 }
                    maxLength={255}
                    name="password"
                    onChange={ handleInputChange }
                    placeholder="Password"
                    required
                    type="password"
                    value={ password }
                />
                <input
                    className="auth__input"
                    minLength={ 6 }
                    maxLength={255}
                    name="password2"
                    onChange={ handleInputChange }
                    placeholder="Confirm"
                    required
                    type="password"
                    value={ password2 }
                />
                <button 
                    className="btn btn-primary btn-block mb-5"
                    disabled={ loading }
                    type="submit" 
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>

            </form>
        </>
    );
}
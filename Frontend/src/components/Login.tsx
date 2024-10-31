import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';

export default function Login() {
    const { loginUser, loginWithGoogle } = useContext(AuthContext)!;
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        // Attempt to log in the user with the provided email and password
        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/', { replace: true });  // Navigate to home or a specific page after successful login
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError("Failed to log in. Please check your email and password.");
              
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {
                const user = result.user;
                navigate('/', { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    };

    return (
        <>
            <section className="vh-100 login-page">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleLogin}>
                                <div className="d-flex flex-row align-items-center justify-content-center align-items-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3 mt-2 text-align-center">Sign in with</p>
                                    <div className="d-flex flex-row">
                                        <button
                                            type="button"
                                            data-mdb-button-init
                                            data-mdb-ripple-init
                                            className="btn btn-primary btn-floating mx-1"
                                            onClick={handleGoogleLogin}
                                        >
                                            <i className="fab fa-google"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                {/* Email input */}
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        required
                                    />
                                    <label className="form-label" htmlFor="email">
                                        Email address
                                    </label>
                                </div>

                                {/* Password input */}
                                <div data-mdb-input-init className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                </div>

                                {error && <div className="text-danger mb-3">{error}</div>}

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Checkbox */}
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        data-mdb-button-init
                                        data-mdb-ripple-init
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    >
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <Link to='/sign-up' className="link-danger">
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

               
            </section>
        </>
    );
}

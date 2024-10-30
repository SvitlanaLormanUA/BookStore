import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { error } from 'console';

export default function SignUp() {
    const {createUser, loginWithGoogle} = useContext(AuthContext)!;
    const [error, setError] = useState("error");

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || { pathname: '/' };

    const handleGoogleRegister = () => {
        loginWithGoogle().then((result) => {
            const user = result.user;
            navigate(from, {replace: true});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        })
    }
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        
        
        // Here you can handle the sign-up logic, such as making an API call
        console.log(name, email, password, confirmPassword);
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } 
        createUser(email, password).then((userCredential) => {
            const user = userCredential.user;
            navigate(from, {replace: true});
        }) 
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        })
    };

    return (
        <>
            <section className="vh-100 register-page">
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
                            <form onSubmit={handleSignUp}>
                                <div className="d-flex flex-row align-items-center justify-content-center align-items-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3 mt-2 text-align-center">Sign up with</p>
                                    <div className="d-flex flex-row">
                                        <button
                                            type="button"
                                            data-mdb-button-init
                                            data-mdb-ripple-init
                                            className="btn btn-primary btn-floating mx-1"
                                            onClick={handleGoogleRegister}
                                        >
                                            <i className="fab fa-google"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                {/* Name input */}
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <label className="form-label" htmlFor="name">
                                        Name
                                    </label>
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

                                {/* Confirm Password input */}
                                <div data-mdb-input-init className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <label className="form-label" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        data-mdb-button-init
                                        data-mdb-ripple-init
                                        className="btn btn-primary btn-lg"
                                        
                                    >
                                        Sign Up
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Already have an account?{' '}
                                        <Link to='/login' className="link-danger">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer-register-page d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 ">
                    {/* Social Media Icons */}
                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

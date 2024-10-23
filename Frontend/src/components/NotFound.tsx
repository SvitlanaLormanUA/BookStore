
export default function NotFound() {
    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-4">Oops! The page you're looking for doesn't exist.</h2>
            <p className="text-muted mb-4">It seems you may have taken a wrong turn.</p>
            <a href="/" className="btn btn-primary btn-lg">
                Go Back Home
            </a>
        </div>
    );
}

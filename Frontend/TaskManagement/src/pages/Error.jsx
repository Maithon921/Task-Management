import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-5xl font-bold text-primary mb-4">{error?.status || "404"}</h1>
      <p className="text-xl text-textSub mb-4">Oops! Page {error?.statusText || "not found"}.</p>
      <p className="text-textSub mb-6">{error?.data}</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}

export default ErrorPage;

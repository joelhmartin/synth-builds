import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <main className="p-5">
        <h1 className="text-3xl font-bold mb-2">Oops...</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "This page does not exist"
            : "Unexpected Error"}
        </p>
      </main>
    </>
  );
};

export default ErrorPage;

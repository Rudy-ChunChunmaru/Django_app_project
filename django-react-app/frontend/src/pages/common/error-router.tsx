import { useRouteError } from "react-router-dom";

const ErrorRouter = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error && (error.statusText || error.message)}</i>
      </p>
    </div>
  );
};

export default ErrorRouter;

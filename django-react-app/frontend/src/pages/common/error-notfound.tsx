import { useNavigate } from "react-router-dom";

function ErrorNotFound() {
  const navigate = useNavigate();
  const goIndex = () => {
    navigate("/");
  };
  return (
    <div className="fixed h-full w-full pt-5">
      <div className="flex flex-col items-center justify-center">
        <h1>
          <strong>404 Not Found</strong>
        </h1>
        <p>The page you'er looking for does't exist !!!</p>
        <br></br>
        <a className="text-blue-700" onClick={goIndex}>
          <u>go to main page</u>
        </a>
      </div>
    </div>
  );
}

export default ErrorNotFound;

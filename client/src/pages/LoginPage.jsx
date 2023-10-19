import { Link } from "react-router-dom";
import logo from "../assets/icon.png";
import no from "../assets/no.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login: loginRequest, navigate } = useAuth();

  const submitter = (data) => loginRequest(data);

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="formContainer">
        <form onSubmit={handleSubmit(submitter)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1>Chappy</h1>
          </div>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must have at least 3 characters",
              },
            })}
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type="submit">Login</button>
          <span>
            No account <img src={no} alt="no" />?{" "}
            <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default LoginPage;

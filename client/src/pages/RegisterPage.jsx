import { Link } from "react-router-dom";
import logo from "../assets/icon.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { register: registerRequest, navigate } = useAuth();

  const submitter = (data) => {
    if (data.password !== data.confirmPassword) return;
    registerRequest(data);
  };

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
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
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
          <input
            type="password"
            {...register("confirmPassword", {
              required: "This field is required",
            })}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          {watch("password") !== watch("confirmPassword") && (
            <p>Passwrods doesn't match</p>
          )}
          <button type="submit">Register</button>
          <span>
            Already have an account 🤨? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;

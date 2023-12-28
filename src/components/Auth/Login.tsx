import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slice/auth/authSlice";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    setError(null);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-12">
      <div className="mx-auto w-full max-w-lg border border-black/10 p-10 rounded-lg bg-gray-400">
        <h2 className="text-center text-black text-xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5 text-black/70">
            <Input
              label="Email : "
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password : "
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            <div className="flex items-center justify-center">
              <Button className="w-64" type="submit">
                Login
              </Button>
            </div>
          </div>
        </form>
        <h2 className="text-center text-base text-black/40">
          Don't have an account yet{" "}
          <Link className="text-blue-500" to="/signup">
            Sign up
          </Link>
        </h2>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

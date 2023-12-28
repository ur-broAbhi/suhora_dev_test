import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login } from "../../store/slice/auth/authSlice";
import { Input, Button } from "../index";

interface SignUpValues {
  email: string;
  password: string;
  name: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<SignUpValues>();

  const create: SubmitHandler<SignUpValues> = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-12">
      <div className="mx-auto w-full max-w-lg border border-black/10 p-10 rounded-lg bg-gray-400">
        <h2 className="text-center text-black text-xl font-semibold">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5 text-black/70">
            <Input
              label="Name : "
              placeholder="Name"
              type="text"
              {...register("name", { required: true })}
            />
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
                Signup
              </Button>
            </div>
          </div>
        </form>
        <h2 className="text-center text-base text-black/40">
          Already have an account yet{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </h2>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;

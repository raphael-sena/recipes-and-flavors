import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignUpButtonComponent from "./SignUpButtonComponent";
import { useAuth } from "@/context/UseAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

type LoginFormData = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email().required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const LoginComponent = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const router = useRouter(); 
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(validation),
  });  

  const handleSignUp = () => {
    window.location.href = "/register";
  };

  const handleLogin = async (form: LoginFormData) => {
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center font-mulish text-darkBlue">
      <div className="p-8 lg:w-96 flex flex-col">

        <div className="block text-center mt-8 pt-2 mb-2">
          <h1 className="font-bold text-4xl">Welcome Back</h1>
          <h3 className="text-2xl">Login to your account</h3>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-bold text-darkBlue"
            >
              E-mail
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="Enter your e-mail"
              required
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-lg font-bold"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue pr-10"
                placeholder="Enter your password"
                required
                {...register("password")}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <div
                className="absolute right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-darkBlue" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-darkBlue" />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-lightBlue text-light rounded-lg hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>

        <a href="passwordReset" className="py-1 text-right text-darkBlue hover:text-lightBlue">
          <p>Forgot your password?</p>
        </a>

        <SignUpButtonComponent 
          onClick={handleSignUp} 
          text="Sign in"
        />
      </div>
    </div>
  );
};

export default LoginComponent;

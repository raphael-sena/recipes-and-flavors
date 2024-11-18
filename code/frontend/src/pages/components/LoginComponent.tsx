import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignUpButtonComponent from "./SignUpButtonComponent";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    window.location.href = "/register";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setError("");
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful:", data);
          localStorage.setItem("authToken", data.token);
           window.location.href = "/home";
        } else {
          setError(data.messsage || "invalid credentials");
        }
      } catch (error) {
        setError("An error occurred, please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setError("Please enter all fields.");
    }
  };

  return (
    <div className="flex justify-center items-center font-mulish">
      <div className="p-8 lg:w-96 flex flex-col">

        <div className="block text-center mt-8 pt-2 mb-2  text-blue">
          <h1 className="font-bold text-4xl">Welcome Back</h1>
          <h3 className="text-2xl">Login to your account</h3>
        </div>

        {error && <p className="text-darkRed text-sm lg:mb-4 my-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-bold text-darkBlue"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="Enter your e-mail"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-lg font-bold text-blue"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue pr-10"
                placeholder="Enter your password"
              />
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
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>

        <p className="py-1 text-right text-darkBlue hover:text-lightBlue">
          <a href="">Forgot your password?</a>
        </p>

        <SignUpButtonComponent 
          onClick={handleSignUp} 
          text="Sign in"
        />
      </div>
    </div>
  );
};

export default LoginComponent;

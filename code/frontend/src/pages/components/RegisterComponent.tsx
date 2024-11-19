import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from 'next/link'

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  samePassword: string;
  role: string;
}

const RegisterComponent: React.FC = () => {
  // Definir estados do formulário e erro
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    samePassword: "",
    role: "BASIC",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações do formulário
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.samePassword
    ) {
      setError("Please fill out all fields.");
      return;
    }

    if (formData.password !== formData.samePassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Limpar erros e iniciar carregamento
    setError("");
    setLoading(true);

    try {
      setLoading(true);
      // Enviar dados para o servidor
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      console.log("Response status:", response.status); // Status HTTP
      console.log("Response OK:", response.ok); // Verifica se foi OK (2xx)

      // Lida com cadastro bem sucedido
      if (response.ok) {
        // A resposta não contém corpo, mas contém o cabeçalho Location
        const locationHeader = response.headers.get("Location");
        console.log("Location Header:", locationHeader); // URI do novo recurso criado

        alert("Register successful!");
        setLoading(false);
        setError("");
        router.push("/login");
      } else {
        // Se a resposta não for bem-sucedida, exibe a mensagem de erro
        const errorData = await response.json(); // Tenta obter a mensagem de erro em JSON
        console.log("Error Response Data:", errorData);
        setError(errorData.message || "An error occurred, please try again.");
      }
    } catch (error) {
      // Captura qualquer erro inesperado e exibe uma mensagem
      console.error("Error during registration:", error);
      setError("A server error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center font-mulish">
      <div className="p-8 lg:w-96 flex flex-col">
        <div className="block text-center mt-8 pt-2 mb-2 text-blue">
          <h1 className="font-bold text-4xl">Register</h1>
          <h3 className="text-2xl">Create your new account</h3>
        </div>

        {error && <p className="text-darkRed text-sm lg:mb-4 my-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Campo de nome */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-bold text-darkBlue"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue"
              placeholder="Enter your e-name"
            />
          </div>

          {/* Campo de e-mail */}
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

          {/* Campo de senha */}
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

          {/* Campo de confirmação de senha */}
          <div className="relative">
            <label
              htmlFor="samePassword"
              className="block text-lg font-bold text-blue"
            >
              Re-enter Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="samePassword"
                name="samePassword"
                value={formData.samePassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue pr-10"
                placeholder="Re-enter your password"
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

          {/* Botão de submit */}
          <button
            type="submit"
            className="w-full py-2 bg-lightBlue text-light rounded-lg hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue"
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? "Loading..." : "Register"}
          </button>

          <div>
            <p className="text-darkBlue text-md text-end">
              Already have an account? <Link className="text-lightBlue hover:text-darkBlue" href="/login">Sign In</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;

"use client";

import Image from "next/image";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

type PasswordResetInputs = {
  email: string;
  password?: string;
  confirmPassword?: string;
};

const validationEmail = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

const validationPassword = Yup.object().shape({
  password: Yup.string().min(6, "A senha deve ter pelo menos 8 caracteres").required("Nova senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não correspondem")
    .required("Confirmação de senha é obrigatória"),
});

const PasswordResetPage = (props: Props) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetInputs>({
    resolver: yupResolver(emailSubmitted ? validationPassword : validationEmail),
  });

  const handleEmailSubmit = async (form: PasswordResetInputs) => {
    try {
      // Passa o e-mail como parâmetro na URL
      const response = await fetch(`http://localhost:8080/api/password/verify-email?email=${encodeURIComponent(form.email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setIsEmailValid(true);
        setEmailSubmitted(true);
      } else {
        console.error("Email não encontrado ou inválido.");
        toast.warn("Email não encontrado ou inválido."); // Exibe uma mensagem de aviso
      }
    } catch (error) {
      console.error("Erro ao verificar o email", error);
      toast.error("Erro ao verificar o email."); // Exibe uma mensagem de erro
    }
  };
  

  const handlePasswordReset = async (form: PasswordResetInputs) => {
    try {
      if(form.password !== form.confirmPassword) {
        toast.warn("As senhas não correspondem."); // Exibe uma mensagem de aviso
        return;
      }
      // Chama o serviço de redefinição de senha no back-end
      const response = await fetch("http://localhost:8080/api/password/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        }),
      });

      if (response.ok) {
        router.push("/"); // Redireciona o usuário para a página de login após a redefinição da senha
      } else {
        console.error("Erro ao redefinir a senha");
        toast.error("Erro ao redefinir a senha."); // Exibe uma mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao redefinir a senha", error);
      toast.error("Erro ao redefinir a senha."); // Exibe uma mensagem de erro
    }
  };

  return (
    <main
      className="h-screen flex items-center justify-center bg-light"
    >
      <ToastContainer />
      <section className="h-[700px] px-16 rounded-3xl bg-lighterBlue flex justify-center items-center flex-col">
        <Image
          width={300}
          height={300}
          src="/img/Recipes&Flavors.png"
          alt="logo"
          className=""
        />
        <h1 className="text-4xl font-black text-center text-darkBlue mt-12">
          Reset Password
        </h1>
        <div className="flex justify-center items-center mt-8 w-full flex-col">
          <form onSubmit={handleSubmit(isEmailValid ? handlePasswordReset : handleEmailSubmit)}>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="px-4 py-4 rounded-lg w-full mb-4"
              required
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            {isEmailValid && (
              <>
                <input
                  type="password"
                  placeholder="Digite sua nova senha"
                  className="px-4 py-4 rounded-lg w-full mb-4"
                  required
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                
                <input
                  type="password"
                  placeholder="Confirme sua nova senha"
                  className="px-4 py-4 rounded-lg w-full mb-4"
                  required
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              </>
            )}

            <button
              type="submit"
              className="bg-zinc-800 w-full text-white px-8 py-4 rounded-lg"
            >
              {isEmailValid ? "Redefinir Senha" : "Verificar Email"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default PasswordResetPage;
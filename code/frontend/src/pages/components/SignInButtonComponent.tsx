import React from "react";

interface SignInButtonComponentProps {
  onClick: () => void; // Função chamada quando o botão é clicado
  text: string; // Texto exibido no botão
}

const SignInButtonComponent: React.FC<SignInButtonComponentProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 my-2 bg-darkBrown text-light font-normal text-2xl rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
    >
      {text}
    </button>
  );
};

export default SignInButtonComponent;
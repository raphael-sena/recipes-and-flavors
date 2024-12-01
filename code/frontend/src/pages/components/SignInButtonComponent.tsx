import React, { useState } from "react";

interface SignInButtonComponentProps {
  onClick: () => void; // Função chamada quando o botão é clicado
  text: string; // Texto exibido no botão
}

const SignInButtonComponent: React.FC<SignInButtonComponentProps> = ({ onClick }) => {
  const [loading, setLoading] = useState(false);
  
  return (
    <button
      onClick={onClick}
      className="w-full py-3 my-2 bg-lightBlue text-light font-normal text-2xl rounded-lg hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue"
      disabled={loading}
    >
      {loading ? "Loading..." : "Sign In"}
    </button>
  );
};

export default SignInButtonComponent;
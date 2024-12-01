import React, { useState } from "react";

interface SignUpButtonComponentProps {
  onClick: () => void; // Função chamada quando o botão é clicado
  text: string; // Texto exibido no botão
}

const SignInButtonComponent: React.FC<SignUpButtonComponentProps> = ({ onClick }) => {
  const [loading, setLoading] = useState(false);
  
  return (
    <button
    onClick={onClick}
    className="w-full py-2 my-4 bg-lightBlue text-light rounded-lg hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue"
    disabled={loading}
  >
    {loading ? "Loading..." : "Sign Up"}
  </button>
  );
};

export default SignInButtonComponent;
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/UseAuth";

const withAuth = <P extends object>(WrappedComponent: React.FC<P>, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const { isLoggedIn, getRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        const currentUrl = window.location.href;
        router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
      } else {
        const role = getRole();
        console.log(role);
        if (!allowedRoles.includes(role || "")) {
          router.push("/unauthorized");
        }
      }
    }, [isLoggedIn, getRole, router]);

    // Verificação de autenticação e autorização
    if (!isLoggedIn()) {
      return null; // Pode retornar um componente de carregamento ou mensagem de acesso negado
    }

    if (!allowedRoles.includes(getRole() || "")) {
      router.push("/unauthorized"); // Redireciona para página de "Não autorizado"
      return null;
    }

    // Se o usuário está autenticado e autorizado, renderiza o componente
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
import { useRouter } from 'next/router';
import { SlArrowLeft } from "react-icons/sl";


const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // Check if there's a history to go back to, otherwise redirect to the homepage or a default page
    if (router.asPath !== router.pathname) {
      router.back();
    } else {
      router.push('/'); // Redirect to home page if no history
    }
  };

  return (
    <button className="fixed top-4 left-4 p-6 flex items-center justify-center text-white transition-all" onClick={handleGoBack}>
      <SlArrowLeft />
    </button>
  );
};

export default GoBackButton;

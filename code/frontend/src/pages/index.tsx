import Footer from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import SignInButtonComponent from "./components/SignInButtonComponent";
import ScrollToReachUs from "./components/ScrollToReachUsComponent";
import GoBackButton from "./components/GoBackButtonComponent";

export default function LandingPage() {
  
  const handleSignIn = () => {
    window.location.href = "/login";
  }

  return (
    <div className="lg:block lg:px-12 grid grid-rows-[1fr_auto] min-h-screen items-center justify-items-center p-8 sm:p-8 bg-background">
              <GoBackButton />


      {/* Conteúdo Principal */}
      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-8 items-center lg:justify-items-center font-mulish text-darkblue w-full row-start-1 lg:divide-x lg:divide-black">

        <div className="lg:ml-12 lg:pl-12 justify-center lg:justify-self-end">
          <div className="pt-12 text-4xl">
            <h1>Welcome to</h1>
            <h1 className="font-extrabold">Recipes&Flavors</h1>
          </div>

          <img
            src="/img/Recipes&Flavors.png"
            alt="Logo Recipes & Flavors"
            width={400}
            height={400}
            className="rounded-full py-8"
          />

          <h1 className="text-3xl font-bold text-center py-2 mb-12">
            Start making your <br /> days foodier!
          </h1>
        </div>

        <div
          className="lg:hidden lg:w-full w-full"
        >
          <SignInButtonComponent 
            onClick={handleSignIn} 
            text="Sign in"
          />
        </div>

        <ScrollToReachUs />

        <div className="hidden lg:block lg:mr-20 lg:p-20 order-3 pt-10 mt-10 lg:justify-self-start">
          <LoginComponent />
        </div>
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

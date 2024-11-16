import Image from "next/image";
import SignInButtonComponent from "./components/SignInButtonComponent";
import Footer from "./components/FooterComponent";

const handleSignInClick = () => {
  console.log("Botão de Sign In clicado!");
};

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-16 gap-16 sm:p-8 bg-background">
      {/* pb-16 max-w-full overflow-hidden"> */}
      <div className="flex flex-col gap-8 row-start-2 items-center font-mulish text-darkblue w-full">
        <div className="py-0 text-4xl">
          <h1>Welcome to</h1>
          <h1 className="font-extrabold">Recipes&Flavors</h1>
        </div>

        <img
          src="/img/Recipes&Flavors.png"
          alt="Logo Recipes & Flavors"
          width={400}
          height={400}
          className="rounded-full"
        />

        <div className="flex flex-col items-center justify-items-center w-full">
          <h1 className="text-3xl font-bold text-center py-2 mb-3">
            Start making your <br /> days foodier!
          </h1>

            <SignInButtonComponent onClick={handleSignInClick} text="Sign In" />

            <p className="text-center text-2xl text-darkblue py-1 font-extrabold">
              <a href="/signup">Create an account</a>
            </p>
        </div>
 
        <Footer />
      </div>
    </div>
  );
}

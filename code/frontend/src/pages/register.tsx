"use server"

import Footer from "./components/FooterComponent";
import GoBackButton from "./components/GoBackButtonComponent";
import RegisterComponent from "./components/RegisterComponent";

export default function Register() {
    return (
        <div className="bg-background min-h-screen">
          <div className="absolute w-full h-[417px] top-[-212px] bg-lightBlue rounded-full font-mulish"></div>

          <GoBackButton />
    
          <div className="text-center flex flex-col items-center justify-center transform translate-y-24">
            <img
              src="/img/Recipes&Flavors.png"
              alt="Logo Recipes & Flavors"
              width={300}
              height={300}
              className="rounded-full py-8"
            />
            
          </div>
    
            <RegisterComponent />
            <Footer />
        </div>
      );
}
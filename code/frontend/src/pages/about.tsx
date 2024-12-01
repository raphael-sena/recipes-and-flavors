import GoBackButton from "./components/GoBackButtonComponent";
import ScrollToReachUs from "./components/ScrollToReachUsComponent";

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background">
          <GoBackButton />
      
          {/* Conteúdo Principal */}
          <div className="text-center font-mulish text-darkblue w-full flex flex-col items-center">
            <div className="pt-12 text-4xl">
              <h1>Welcome to</h1>
              <h1 className="font-extrabold">Recipes&Flavors</h1>
            </div>
      
            <img
              src="/img/Recipes&Flavors.png"
              alt="Logo Recipes & Flavors"
              width={400}
              height={400}
              className="rounded-full py-8 mx-auto"
            />
      
            <h1 className="text-3xl font-bold py-2 mb-12">
              Start making your <br /> days foodier!
            </h1>
          </div>

          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mb-1">
            <div className="mb-2">
                <h1 className="text-3xl font-bold">About Us
                    <hr className="h-px mb-2 bg-darkBlue border-0" />
                </h1>
                <p className="text-justify">Welcome to <strong>Recipes & Flavors</strong> – your ultimate online destination for discovering, sharing, and enjoying delicious recipes! Whether you're a seasoned chef or just beginning your culinary journey, we’re <strong>here to inspire</strong> and support you every step of the way.
                At Recipes & Flavors, we believe that food is more than just nourishment – it's a way to connect, create memories, and explore new cultures.</p>
            </div>
            <div className="mb-2">
                <h1 className="text-3xl font-bold">What We Offer
                    <hr className="h-px mb-2 bg-darkBlue border-0" />
                </h1>
                <ul className="text-justify">
                    <li>
                        <p><strong>Endless Recipes</strong>: Explore a wide variety of recipes for every taste, dietary need, and occasion. From simple weeknight dinners to extravagant desserts, you'll find inspiration at your fingertips.</p>
                    </li>
                    <li>
                        <p><strong>Personalized Recommendations</strong>: Based on your preferences, dietary restrictions, and past activities, we offer tailored suggestions to make your cooking experience even more enjoyable.</p>
                    </li>
                    <li>
                        <p><strong>Community-driven Content</strong>: We’re not just a recipe site – we’re a community. Share your favorite creations and interact with fellow food lovers. Together, we’re creating a space where everyone’s culinary voice is heard.</p>
                    </li>
                </ul>
            </div>
            <div>
                <h1 className="text-3xl font-bold">Our Story
                    <hr className="h-px mb-2 bg-darkBlue border-0" />
                </h1>
                <p className="text-justify"><strong>Recipes & Flavors</strong> was founded by Raphael Sena A. Brito, a food lover who wanted to bring people together through the joy of cooking. What started as a small project to be part of a vacancy step, has grown into a vibrant online platform, where home cooks, food enthusiasts, and professional chefs alike can exchange ideas, learn new techniques, and inspire each other.
                Our name, <strong>Recipes & Flavors</strong>, reflects two key elements we value: <strong>Recipes</strong> (everything) and <strong>Flavors</strong> (taste). We believe that great cooking is a blend of flavor and learning, and we're dedicated to helping you discover both.</p>
            </div>
          </div>
        </div>
      );      
      
}

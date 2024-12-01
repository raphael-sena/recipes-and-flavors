import { useEffect, useState } from "react";
import { HiLogout, HiMenuAlt2, HiHome } from "react-icons/hi";
import { BiSolidCategoryAlt, BiSolidFoodMenu } from "react-icons/bi";
import { MdAssignmentAdd } from "react-icons/md";
import { FaCoffee, FaSearch } from "react-icons/fa";
import { GiHotMeal, GiMeal, GiStairsCake } from "react-icons/gi";
import { useAuth } from "@/context/UseAuth";
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ email: "", name: "", image: "" });
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleNavigationToProfile = () => {
    window.location.href = "/profile";
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (token) {
      fetch("http://localhost:8080/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Dados do usuário:", data);
          if (data.email) {
            setUser({
              email: data.email,
              name: data.name,
              image: data.image || "./public/img/profile_avatar.png",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div>
      {/* Menu fixo à esquerda em telas grandes */}
      <nav className="hidden md:flex md:flex-col bg-background text-white md:w-64 md:fixed md:top-0 md:left-0 md:max-h-full z-20">
        <div className="flex items-center justify-center h-16 mt-6 bg-background">
          <Link
            href={{
              pathname: "/about",
            }}
            target="_blank"
          >
            <img
              src="/img/Recipes&Flavors.png"
              alt="Logo Recipes & Flavors"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Link>
        </div>
        <ul className="flex flex-col space-y-4 mt-4 text-darkBlue divide-x divide-darkBlue">
          <li className="px-4 py-2 hover:bg-darkBlue hover:text-light">
            <a href="/home" className="flex items-center text-center">
              <HiHome />
              <p className="px-2">Home</p>
            </a>
          </li>

          <li className="relative group px-4 py-2 hover:bg-darkBlue hover:text-light">
            <div className="flex items-center text-center">
              <GiHotMeal />
              <p className="px-2">Recipes</p>
            </div>
            <ul className="absolute left-60 top-0 bg-darkBlue text-light shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out ml-1 w-full">
              <li className="hover:bg-blue hover:text-darkBlue">
                <a
                  href="/my-recipes"
                  className="px-4 py-2 flex items-center text-center"
                >
                  <BiSolidFoodMenu />
                  <p className="pl-2">My Recipes</p>
                </a>
              </li>
              <li  className="hover:bg-blue hover:text-darkBlue">
                <a
                  href="/recipe"
                  className="px-4 py-2 flex items-center text-center"
                >
                  <MdAssignmentAdd />
                  <p className="px-2">New Recipe</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="relative group px-4 py-2 hover:bg-darkBlue hover:text-light">
            <div className="flex items-center text-center">
              <BiSolidCategoryAlt />
              <p className="px-2">Category</p>
            </div>
            <ul className="absolute left-60 top-0 bg-darkBlue text-light shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out ml-1 w-full">
              <li className="hover:bg-blue hover:text-darkBlue">
                <a
                  href="/recipes=?breakfast"
                  className="px-4 py-2 flex items-center text-center"
                >
                  <FaCoffee />
                  <p className="pl-2">Breakfast</p>
                </a>
              </li>
              <li  className="hover:bg-blue hover:text-darkBlue">
                <a
                  href="/recipe"
                  className="px-4 py-2 flex items-center text-center"
                >
                  <GiMeal />
                  <p className="px-2">Lunch / Dinner</p>
                </a>
              </li>
              <li  className="hover:bg-blue hover:text-darkBlue">
                <a
                  href="/recipe"
                  className="px-4 py-2 flex items-center text-center"
                >
                  <GiStairsCake />
                  <p className="px-2">Dessert</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="px-4 py-2 hover:bg-darkBlue hover:text-light">
            <a href="/search" className="flex items-center text-center">
              <FaSearch />
              <p className="px-2">Search</p>
            </a>
          </li>

          <button
            onClick={handleLogout}
            className="text-start px-4 py-2 text-red-600 hover:bg-darkRed hover:text-darkBlue"
          >
            <div className="flex items-center text-center">
              <HiLogout />
              <p className="px-2">Logout</p>
            </div>
          </button>
        </ul>
      </nav>

      {/* Menu interativo para telas pequenas */}
      <div className="md:hidden">
        <div className="flex justify-between items-center text-darkBlue h-16 px-4">
          <button
            onClick={toggleMenu}
            className="text-lightBlue hover:text-darkBlue focus:outline-none text-2xl"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <HiMenuAlt2 /> : <HiMenuAlt2 />}
          </button>
          <Link
            href={{
              pathname: '/about'
            }}
          >
            <img
              src="/img/Recipes&Flavors.png"
              alt="Logo Recipes & Flavors"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>
        {isOpen && (
          <div className="absolute inset-0 bg-lightBlue text-light backdrop-blur-sm flex justify-between items-left justify-top p-5 z-50">
            <div>
              <div>
                {user ? (
                  <div
                    className="flex justify-items-center"
                    onClick={handleNavigationToProfile}
                  >
                    <img
                      src={user.image || "/img/profile_avatar.png"}
                      alt="User Avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <p className="px-2 py-2 text-center text-2xl">Profile</p>
                  </div>
                ) : (
                  <p>User not found</p>
                )}
              </div>
              <ul className="divide-y divide-darkBlue text-lg py-4">
                <li className="px-4 py-2 ">
                  <a href="/home" className="flex items-center text-center">
                    <HiHome />
                    <p className="px-2">Home</p>
                  </a>
                </li>

                <li className="px-4 py-2 ">
                  <div className="flex items-center text-center">
                    <GiHotMeal />
                    <p className="px-2">Recipes</p>
                  </div>
                  <li className="ml-8">
                    <a
                      href="/my-recipes"
                      className="flex items-center text-center"
                    >
                      <BiSolidFoodMenu />
                      <p className="px-2">My Recipes</p>
                    </a>
                  </li>
                  <li className="ml-8">
                    <a href="/recipe" className="flex items-center text-center">
                      <MdAssignmentAdd />
                      <p className="px-2">New Recipe</p>
                    </a>
                  </li>
                </li>

                <Link
                  href={{
                    pathname: '/search'
                  }}
                >
                  <li className="px-4 py-2">
                    <div className="flex items-center text-center">
                      <FaSearch />
                      <p className="px-2">Search</p>
                    </div>
                  </li>
                </Link>

                <li className="px-4 py-2 ">
                  <button onClick={handleLogout}>
                    <div className="flex items-center text-center">
                      <HiLogout />
                      <p className="px-2">Logout</p>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <div className="items-end">
                <button
                  onClick={toggleMenu}
                  className="text-light hover:text-darkBlue focus:outline-none text-2xl"
                >
                  <span className="sr-only">Toggle menu</span>
                  {isOpen ? <HiMenuAlt2 /> : <HiMenuAlt2 />}
                </button>
              </div>
              <div className="my-2 py-2">
                <a href="/about">
                  <img
                    src="/img/Recipes&Flavors.webp"
                    alt="Logo Recipes & Flavors"
                    width={45}
                    height={45}
                  />
                  <p className="text-2xs">Click me!</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

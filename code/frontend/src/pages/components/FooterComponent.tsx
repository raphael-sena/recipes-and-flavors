import React from "react";

export default function Footer() {
  return (
    <footer className="block font-mulish mt-7 pt-7">
      <div className="grid grid-cols-2 divide-x divide-black sm:divide-0 lg:divide-x-0">
        <div className="flex flex-col justify-center pr-6 items-end">
          <img
            src="/img/Recipes&Flavors.png"
            alt="Logo Recipes & Flavors"
            width={125}
            height={125}
            className="rounded-full"
          />
          <h3 className="py-5 text-center font-bold text-base">
            Start making your <br /> days foodier!
          </h3>
        </div>

        <div className="flex flex-col pl-12 mr-12">
          <p>
            <strong>
              <a href="">Home</a>
            </strong>
          </p>
          <p>
            <strong>
              <a href="">Help</a>
            </strong>
          </p>
          <p>
            <strong>Contact</strong>
          </p>
          <p className="px-5 text-sm">
            <a href="">Email</a>
          </p>
          <p className="px-5 text-sm">
            <a href="">Phone</a>
          </p>
          <p className="px-5 text-sm">
            <a href="">Address</a>
          </p>
          <p>
            <strong>Social Media</strong>
          </p>
          <p className="px-5 text-sm">
            <a href="">LinkedIn</a>
          </p>
          <p className="px-5 text-sm">
            <a href="">WhatsApp</a>
          </p>
          <p>
            <strong>
              <a href="">About Us</a>
            </strong>
          </p>
        </div>
      </div>

      <div className="sm:block text-justify">
        <div className="lg:flex lg:text-center justify-center lg:flex font-normal sm:text-sm lg:text-lg mt-3 pt-3">
          <p className="">&copy; <strong>2024 Recipes&Foods. All rights reserved</strong></p>
          <p>Designed with care by <strong>Raphael Sena A. Brito</strong> </p>
          <p>Links to<a href="/"><strong>Privacy Policy</strong></a> and <a href="/"><strong>Terms of Service</strong></a></p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";

export default function Footer() {
  return (
    <footer className="font-mulish mt-7 pt-7">
      <div className="grid grid-cols-2 divide-x divide-black gap-3 items-center justify-items-center gap-4">
        <div>
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

        <div className="flex flex-col px-4">
            <p><strong><a href="">Home</a></strong></p>
            <p><strong><a href="">Help</a></strong></p>
            <p><strong>Contact</strong></p>
            <p className="px-5 text-sm"><a href="">Email</a></p>
            <p className="px-5 text-sm"><a href="">Phone</a></p>
            <p className="px-5 text-sm"><a href="">Address</a></p>
            <p><strong>Social Media</strong></p>
            <p className="px-5 text-sm"><a href="">LinkedIn</a></p>
            <p className="px-5 text-sm"><a href="">WhatsApp</a></p>
            <p><strong><a href="">About Us</a></strong></p>
        </div>
      </div>

      <p className="text-justify font-normal text-sm mt-3 pt-3">
        &copy; <strong>2024 Recipes&Foods. All rights reserved </strong> <br />{" "}
        Designed with care by <strong>Raphael Sena A. Brito</strong> <br />{" "}
        Links to <strong>Privacy Policy</strong> and{" "}
        <strong>Terms of Service</strong>
      </p>
    </footer>
  );
}

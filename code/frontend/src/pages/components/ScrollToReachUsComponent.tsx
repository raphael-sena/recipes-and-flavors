import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export default function ScrollToReachUs() {
    const [opacity, setOpacity] = useState(1);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
    
        const newOpacity = Math.max(1 - scrollPosition / 300, 0);
        setOpacity(newOpacity);
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return(
        <div
          className={`lg:hidden order-2 flex justify-center gap-2 text-lg text-center justify-items-center transition-opacity duration-500`}
          style={{ opacity }}
        >
          <FaArrowDown />
          <p>Scroll to reach us!</p>
        </div>
    );
}

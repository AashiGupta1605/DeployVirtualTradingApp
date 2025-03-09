import { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <span
      className={`fixed bottom-6 right-6 bg-white bg-opacity-50 text-black p-3 rounded-full shadow-md cursor-pointer transition-opacity duration-300 backdrop-blur-sm border border-gray-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <i className="fas fa-chevron-up text-lg"></i>
    </span>
  );
};

export default BackToTop;

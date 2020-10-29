import { ChevronRight } from "@styled-icons/feather";
import { FC, useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  onDarkBackground?: boolean;
};

const Header: FC<Props> = ({ onDarkBackground }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll: EventListener = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 80);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-10 h-20 flex items-stretch ${
        onDarkBackground && !scrolled ? "text-white" : ""
      } ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      } transition-all duration-200`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a>
            <img src="/assets/logo.svg" className="h-10" />
          </a>
        </Link>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Link href="/games">
              <a className="px-4 py-2 font-medium opacity-50 hover:opacity-100 mr-2">
                Join Game
              </a>
            </Link>
            <Link href="/host">
              <a className="px-4 py-2 font-medium opacity-50 hover:opacity-100 mr-2">
                Host Game
              </a>
            </Link>
            <Link href="/pitches">
              <a className="px-4 py-2 font-medium opacity-50 hover:opacity-100 mr-2">
                Book Pitch
              </a>
            </Link>
          </div>
          <Link href="/login">
            <a
              className={`inline-block font-bold text-white ${
                onDarkBackground ? "bg-white" : "bg-gray-800"
              } bg-opacity-25 hover:bg-opacity-50 rounded-full px-4 py-2`}
            >
              Sign in <ChevronRight size="18" strokeWidth="2" />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

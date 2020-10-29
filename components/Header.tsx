import { ChevronRight } from "@styled-icons/feather";
import Link from "next/link";
import { FC } from "react";

type Props = {
  onDarkBackground?: boolean;
};

const Header: FC<Props> = ({ onDarkBackground }) => {
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-10 bg-transparent h-20 flex items-stretch ${
        onDarkBackground ? "text-white" : ""
      }`}
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
              <a className="px-4 py-2 font-medium opacity-75 hover:opacity-100 mr-2">
                Join Game
              </a>
            </Link>
            <Link href="/host">
              <a className="px-4 py-2 font-medium opacity-75 hover:opacity-100 mr-2">
                Host Game
              </a>
            </Link>
            <Link href="/pitches">
              <a className="px-4 py-2 font-medium opacity-75 hover:opacity-100 mr-2">
                Book Pitch
              </a>
            </Link>
          </div>
          <Link href="/login">
            <a
              className={`inline-block font-bold ${
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

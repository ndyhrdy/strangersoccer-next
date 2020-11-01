import { ArrowUp } from "@styled-icons/feather";
import { FC, useEffect, useState } from "react";

type Props = {
  containerClassnames?: string;
};

const BackToTopButton: FC<Props> = ({ containerClassnames }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 pb-8 transition-transform duration-300 transform ${
        visible ? "" : "translate-y-24"
      }`}
    >
      <div className={`container ${containerClassnames}`}>
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-4 h-12 flex items-center shadow-lg"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Back to Top <ArrowUp size="20" strokeWidth="3" className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default BackToTopButton;

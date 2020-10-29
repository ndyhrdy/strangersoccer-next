import { ArrowRight } from "@styled-icons/feather";
import Link from "next/link";
import Head from "../components/Head";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="font-sans">
      <Head title="Join Football, Soccer or Futsal Games in Singapore" />
      <Header onDarkBackground />
      <main>
        <section
          className="pt-20 text-white bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url('/assets/home-cover.jpg')` }}
        >
          <div className="container py-32">
            <div className="w-3/5">
              <h1 className="text-6xl font-bold tracking-tight leading-none mb-12">
                Playing Football:
                <br />
                <span className="text-5xl">
                  Now as Easy as Going for a Jog.
                </span>
              </h1>
              <p className="text-xl font-medium tracking-tight mb-12">
                Football is the world’s #1 sport, but is difficult for an
                individual to play. Stranger Soccer makes it as easy as going to
                the gym or for a jog. Choose a game. Purchase a slot. Turn up.
                Play.
              </p>
              <div className="flex items-center">
                <a
                  className="inline-block mr-2"
                  href="https://play.google.com/store/apps/details?id=com.strangersoccer"
                >
                  <img src="/assets/google-play-badge.webp" className="h-12" />
                </a>
                <a
                  className="inline-block mr-4"
                  href="https://play.google.com/store/apps/details?id=com.strangersoccer"
                >
                  <img src="/assets/app-store-badge.webp" className="h-12" />
                </a>
                <Link href="/games">
                  <a className="inline-block bg-primary-600 hover:bg-primary-700 py-1 px-3 tracking-tight rounded-full font-bold">
                    Browse Games <ArrowRight size="14" strokeWidth="3" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

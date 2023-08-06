import Footer from "@components/Footer";
import Navbar, { ActiveLink } from "@components/Navbar";
import Header from "@components/Header";

interface PageLayoutProps {
  children: JSX.Element | JSX.Element[];
  activeLink: ActiveLink;
  background?: JSX.Element;
  navbarBackgroundColor?: string;
}

const PageLayout = ({
  children,
  activeLink,
  background,
  navbarBackgroundColor,
}: PageLayoutProps) => {
  return (
    <>
      <Header />
      <Navbar activeLink={activeLink} backgroundColor={navbarBackgroundColor} />
      <main>
        <div className="flex min-h-screen max-w-5xl mx-auto pt-16 sm:pt-20 lg:pt-24 px-3">
          {children}
        </div>
      </main>
      <Footer backgroundColor={navbarBackgroundColor} />
      {background}
    </>
  );
};

export default PageLayout;

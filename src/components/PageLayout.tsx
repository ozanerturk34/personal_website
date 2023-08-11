import Footer from "@components/Footer";
import Navbar, { ActiveLink } from "@components/Navbar";
import Header from "@components/Header";

interface PageLayoutProps {
  children: JSX.Element | JSX.Element[];
  activeLink: ActiveLink;
  background?: JSX.Element;
  isMenuTransparent?: boolean;
}

const PageLayout = ({
  children,
  activeLink,
  background,
  isMenuTransparent = false,
}: PageLayoutProps) => {
  return (
    <>
      <Header />
      <Navbar activeLink={activeLink} isTransparent={isMenuTransparent} />
      <main>
        <div className="flex min-h-screen max-w-7xl mx-auto px-3 pt-8vh">
          {children}
        </div>
      </main>
      {background}
      <Footer isTransparent={isMenuTransparent} />
    </>
  );
};

export default PageLayout;

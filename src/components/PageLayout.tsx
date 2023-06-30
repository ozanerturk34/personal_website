import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Header from "@components/Header";

interface PageLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <div className="page-wrapper">{children}</div>
        <Footer />
      </main>
    </>
  );
};

export default PageLayout;

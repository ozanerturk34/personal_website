import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Author from "@components/Author";

interface PageLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main>
      <Navbar />
      <Author />
      <div className="page-wrapper">{children}</div>
      <Footer />
    </main>
  );
};

export default PageLayout;

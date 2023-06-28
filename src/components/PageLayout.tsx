import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

interface PageLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main>
      <Navbar />
      <div className="page-wrapper">{children}</div>
      <Footer />
    </main>
  );
};

export default PageLayout;

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="d-flex container justify-content-between">
      <Link href="/">
        <p>Ozan Erturk</p>
      </Link>
      <Link href="/blog">
        <p>Blog</p>
      </Link>
      <Link href="/project">
        <p>Projects</p>
      </Link>
      <Link href="/about">
        <p>About</p>
      </Link>
      <Link href="/contact">
        <p>Contact</p>
      </Link>
    </div>
  );
};

export default Navbar;

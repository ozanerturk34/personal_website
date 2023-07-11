import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div>@copyright 2023</div>
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
      <Link href="https://www.linkedin.com/in/ozan-erturk/">
        <p>Linkedin</p>
      </Link>
      <Link href="https://github.com/ozanerturk34">
        <p>Github</p>
      </Link>
    </div>
  );
};

export default Footer;

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  type IconDefinition,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const SOURCES: { name: string; href: string; icon: IconDefinition }[] = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/ozan-erturk",
    icon: faLinkedin,
  },
  { name: "github", href: "https://github.com/ozanerturk34", icon: faGithub },
  { name: "webpage", href: "https://ozanerturk.me", icon: faHome },
];
interface FooterProps {
  backgroundColor?: string;
}

const Footer = ({ backgroundColor = "bg-black" }: FooterProps) => {
  return (
    <footer>
      <div className={`w-screen ${backgroundColor} z-50`}>
        <div className="max-w-5xl px-3 sm:px-6 mx-auto">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-stretch">
              <div className="flex flex-shrink-0 items-center">
                {/* <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    width={100}
                    height={100}
                  /> */}
                <Link href="/">@copyright 2023</Link>
              </div>
              <div className="flex space-x-4">
                {SOURCES.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

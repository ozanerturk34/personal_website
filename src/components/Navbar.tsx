import { Fragment } from "react";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import useScrollNavbar from "@hooks/useScrollNavbar";

type NavbarLink = "/project" | "/about" | "/contact" | "/blog";

const NAVIGATION: { name: string; href: NavbarLink }[] = [
  {
    name: "Blog",
    href: "/blog",
  },
  { name: "Projects", href: "/project" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export type ActiveLink = NavbarLink | null;
interface NavbarProps {
  activeLink: ActiveLink;
  backgroundColor?: string;
}
const Navbar = ({ activeLink, backgroundColor = "bg-black" }: NavbarProps) => {
  const { top, display, closeDisclosure } = useScrollNavbar();
  return (
    <Disclosure as="nav">
      {({ open, close }) => {
        if (open && closeDisclosure === true) {
          close();
        }
        return (
          <div
            className={`${display} fixed w-screen ${backgroundColor} z-50`}
            style={{ top }}
          >
            <div className="max-w-5xl px-3 sm:px-6 mx-auto">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBars}
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-between sm:items-stretch">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    width={100}
                    height={100}
                  /> */}
                    <Link href="/">Ozan Erturk</Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {NAVIGATION.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`rounded-md px-3 py-2 text-sm font-medium ${
                            activeLink === item.href
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                          aria-current={activeLink ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel className="sm:hidden">
                <div className="flex justify-end mx-2">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                  'block rounded-md px-3 py-2 text-base font-medium'
                  ${
                    activeLink === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                      aria-current={activeLink ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        );
      }}
    </Disclosure>
  );
};

export default Navbar;

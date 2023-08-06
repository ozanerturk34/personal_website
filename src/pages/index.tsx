import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import PageLayout from "@components/PageLayout";
import SolarSystem from "@components/SolarSystem";
import Universe from "@components/Universe";

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <PageLayout
      activeLink={null}
      background={
        <Transition
          appear={true}
          show={show}
          as="div"
          className="flex bg-yellow-50"
          enter="transition-opacity ease-in duration-100]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <Universe />
        </Transition>
      }
      navbarBackgroundColor="transparent"
    >
      <div className="flex flex-col justify-between items-center z-30">
        <Transition
          appear={true}
          show={show}
          as="div"
          className="flex flex-col w-4/5 sm:w-3/4 md:w-2/3 text-center mt-12 sm:mt-16 md:mt-20"
        >
          <Transition.Child
            as="h1"
            className="text-3xl sm:text-4xl md:text-5xl"
            enter="transition-opacity ease-in duration-300 delay-[300ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            Hi! I am a software engineer living in Amsterdam
          </Transition.Child>

          <Transition.Child
            as="h2"
            className="text-lg sm:text-2xl md:text-3xl mt-6 sm:mt-8 md:mt-12"
            enter="transition-opacity ease-in duration-300 delay-[600ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            Talking to computers for a passion
          </Transition.Child>
        </Transition>
        <Transition
          appear={true}
          show={show}
          as="div"
          className="flex w-full h-full"
          enter="transition-opacity ease-in duration-500 delay-[1000ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <SolarSystem />
        </Transition>
      </div>
    </PageLayout>
  );
}

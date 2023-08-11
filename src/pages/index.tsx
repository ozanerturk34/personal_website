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
          enter="transition-opacity ease-in duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <Universe />
        </Transition>
      }
      isMenuTransparent={true}
    >
      <style jsx global>{`
        body {
          background-color: black;
          color: white;
        }
      `}</style>

      <div className="flex flex-col w-full h-150vh justify-between items-center z-30 -mt-8vh">
        <Transition
          appear={true}
          show={show}
          as="div"
          className="flex flex-col w-4/5 sm:w-3/4 md:w-2/3 h-1/3 text-center pt-24 sm:pt-32 md:pt-40 "
        >
          <Transition.Child
            as="h1"
            className="text-3xl sm:text-4xl md:text-5xl"
            enter="transition-opacity ease-in duration-300 delay-[500ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            Hi! I am a software engineer living in Amsterdam
          </Transition.Child>

          <Transition.Child
            as="h2"
            className="text-lg sm:text-2xl md:text-3xl mt-6 sm:mt-8 md:mt-12"
            enter="transition-opacity ease-in duration-300 delay-[700ms]"
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
          className="flex content-center justify-center w-full h-2/3"
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

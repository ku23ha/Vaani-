import React, { Suspense } from "react";
import Link from "next/link";
import ThemeSelector from "../../common/components/ThemeSelector";
import setup from "../../setup";
import clsx from "clsx";
import { GSAPProvider, useScrollReveal } from "../gsap-provider";

const MainLayout = ({
  stickyHeader,
  children,
  footer,
  enforceWidthRestraint = true,
}) => {
  // Initialize scroll reveal animations
  useScrollReveal();

  return (
    <GSAPProvider>
      <div>
        <div className={"flex flex-col gap-2 items-center"}>
          <nav
            className={clsx(
              "max-w-7xl w-full pb-2 z-10 dark:border-zinc-800 px-2",
              // "border-b border-zinc-200 ",
              { "sticky top-0 bg-white ": stickyHeader }
            )}
          >
            <div className={"w-full flex justify-between"}>
              <div className={"flex gap-2"}>
                {/* Logo Side*/}
                <div className={"flex gap-2 items-center rounded-full"}>
                  {/*<Image src={vinciImage} alt={"Da Vinci"} width={50} height={50} className={"rounded-full "}/>*/}
                  <Link href={"/"}>
                    <h1 className={"text-3xl tracking-wider font-bold"}>
                      <span className={"text-gradient drop-shadow"}>
                        {setup.projectName}
                      </span>
                      {/*<span className={"text-green-500"} >fresh</span>Ink*/}
                    </h1>
                    {/*<div className={"h-6 bg-gray-800 dark:bg-gray-200 inline-block blink-around -mb-1"} style={{width: 2}}/>*/}
                  </Link>
                </div>
              </div>
              <div className={clsx("flex gap-5")}>
                {/*  Navcontrol side  */}
                <button className="mr-2 hover:text-lg hover:font-semibold">
                  <a href="#home">Home</a>
                </button>
                <button className="mr-2 hover:text-lg hover:font-semibold">
                  <a href="#data">Data</a>
                </button>
                <button className="mr-2 hover:text-lg hover:font-semibold">
                  <a href="#team">Team</a>
                </button>
                <button className="mr-2 hover:text-lg hover:font-semibold">
                  <a href="#partners">Partners</a>
                </button>
                <button className="hover:text-lg hover:font-semibold">
                  <a href="#about">About</a>
                </button>
                <Suspense fallback={<>...</>}>
                  <ThemeSelector />
                </Suspense>
              </div>
            </div>
          </nav>
          <div className={clsx("w-full", { "max-w-7xl": enforceWidthRestraint })}>
            <Suspense fallback={<>Loading ... </>}>{children}</Suspense>
            {footer}
          </div>
        </div>
      </div>
    </GSAPProvider>
  );
};

export default MainLayout;

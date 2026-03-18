import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import VaaniLogo from "../assets/vaanilogo.png";
import IIScLogo from "../assets/IIScLogo.png";
import ArtparkLogo from "../assets/ARTPARK.png";

function Logo1() {
  return (
    <>
      <div className={"flex gap-6 bg-slate-60"}>
        <Link href={"https://www.iisc.ac.in/"}>
          <Image className="w-12 h-12 " src={IIScLogo} alt="IISc Logo" />
        </Link>
        <Link href={"https://artpark.in/language-data-ai"}>
          <Image
            className={"h-auto w-64"}
            src={ArtparkLogo}
            alt="Artpark Logo"
          />
        </Link>
      </div>
    </>
  );
}

export function CaseStudiesHeader() {
  return (
    <header className="py-5">
      <Container>
        <nav className="relative z-50 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" aria-label="Home">
              <div className={"flex gap-2"}>
                <div className={"flex gap-2 items-center rounded-full"}>
                  <Link href={"/"}>
                    <Image
                      src={VaaniLogo}
                      width={150}
                      height={150}
                      alt="Vaani Logo"
                    />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className={"hidden md:block"}>
              <Logo1 />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}


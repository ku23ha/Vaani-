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
            <Link href="/" className="flex items-center group gap-3">
              <div className="relative h-10 w-8 overflow-hidden">
                <Image 
                  src={require("../assets/vaani-logo-new.png").default} 
                  alt="Vaani Icon" 
                  fill
                  className="object-cover object-[0%]" 
                  priority 
                />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Vaani
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-x-8">
            <div className={"flex items-center gap-8"}>
              <Link href="https://www.iisc.ac.in/" target="_blank">
                <Image src={require("../assets/IIScLogo-new.svg").default} alt="IISc" height={40} className="h-10 w-auto object-contain" />
              </Link>
              <Link href="https://artpark.in/" target="_blank">
                <Image src={require("../assets/ARTPARK-new.png").default} alt="Artpark" height={36} className="h-9 w-auto object-contain" />
              </Link>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}


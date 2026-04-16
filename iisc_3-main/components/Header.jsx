"use client";

import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import IIScLogo from '../assets/IIScLogo-new.svg';
import ArtparkLogo from '../assets/ARTPARK-new.png';
import VaaniLogo from '../assets/vaani-logo-new.png';

const NAV_LINKS = [
  { label: "About", href: "#About" },
  { label: "Data Explorer", href: "#Data" },
  { label: "Impact", href: "#impact" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Team", href: "#Team" },
  { label: "Media", href: "#Media" },
];

function MobileNavLink({ href, children, index }) {
  return (
    <Popover.Button
      as={Link}
      href={href}
      className="block w-full py-3 text-xl font-medium text-white/80 hover:text-[#4285F4] transition-colors animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 overflow-visible stroke-white"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H20M0 8H20M0 15H20"
        className={clsx("origin-center transition", open && "scale-90 opacity-0")}
      />
      <path
        d="M2 2L18 18M18 2L2 18"
        className={clsx("origin-center transition", !open && "scale-90 opacity-0")}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10 ui-not-focus-visible:outline-none transition-colors"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="fixed inset-x-4 top-20 flex origin-top flex-col rounded-2xl p-8 z-50"
            style={{ background: '#0A0A0A', border: '1px solid rgba(66, 133, 244, 0.2)' }}
          >
            {NAV_LINKS.map((link, i) => (
              <MobileNavLink key={link.label} href={link.href} index={i}>
                {link.label}
              </MobileNavLink>
            ))}
            <hr className="my-4 border-white/10" />
            <Popover.Button
              as={Link}
              href="https://huggingface.co/datasets/ARTPARK-IISc/VAANI"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-[#4285F4] px-6 py-3 rounded-full mt-2 animate-fade-up hover:bg-[#1967D2] transition-colors"
              style={{ animationDelay: `${NAV_LINKS.length * 80}ms` }}
            >
              Download Data
            </Popover.Button>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className={scrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#4285F4]/20 transition-all duration-300' : 'bg-transparent transition-all duration-300'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-24">
            {/* Left: Vaani Logo (Icon + White Text) */}
            <div className="flex-shrink-0 w-48">
              <Link href="/" className="flex items-center group gap-3">
                <div className="relative h-10 w-8 overflow-hidden">
                  <Image 
                    src={VaaniLogo} 
                    alt="Vaani Icon" 
                    fill
                    className="object-cover object-[0%] transition-transform duration-300 group-hover:scale-110" 
                    priority 
                  />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight group-hover:text-[#4285F4] transition-colors duration-300">
                  Vaani
                </span>
              </Link>
            </div>

            {/* Top Search Bar (Premium) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="top-search-bar w-full">
                <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search languages, districts, or stories..." 
                  className="top-search-input"
                />
              </div>
            </div>

            {/* Center: Desktop Nav (Enlarged and Uniform) */}
            <div className="hidden md:flex flex-grow justify-center items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-lg font-bold text-white/90 hover:text-[#4285F4] transition-colors group tracking-wide whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4285F4] rounded-full transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right: Institutional Logos (Swapped and Transparent) */}
            <div className="hidden md:flex flex-shrink-0 justify-end items-center gap-8 pl-10">
              <div className="flex items-center gap-8 border-l border-white/10 pl-8 flex-shrink-0">
                <Link href="https://www.iisc.ac.in/" target="_blank" className="hover:scale-110 transition-transform">
                  <Image src={IIScLogo} alt="IISc" height={40} className="h-10 w-auto object-contain brightness-0 invert" />
                </Link>
                <Link href="https://artpark.in/" target="_blank" className="hover:scale-110 transition-transform">
                  <Image src={ArtparkLogo} alt="Artpark" height={36} className="h-9 w-auto object-contain" />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 px-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-xl font-medium text-white/80 hover:text-[#4285F4] transition-colors px-4 py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 px-4">
              <Link
                href="https://huggingface.co/datasets/ARTPARK-IISc/VAANI"
                target="_blank"
                className="block w-full text-center py-3 rounded-xl bg-[#4285F4] text-white font-bold"
              >
                Download Data
              </Link>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}

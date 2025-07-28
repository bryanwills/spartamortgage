"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="https://www.spartamortgage.com/images/Logo_Highres.jpg"
              alt="Sparta Mortgage Logo"
              width={135}
              height={48}
              className="h-9 w-auto sm:h-12 md:h-14 lg:h-16 object-contain p-2"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold hover:text-yellow-500 transition-colors ${pathname === link.href ? "text-yellow-500" : "text-gray-700 dark:text-gray-200"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15028191739"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-colors"
              aria-label="Call us at (502) 819-1739"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(502) 819-1739</span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:+15028191739"
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-colors"
              aria-label="Call us at (502) 819-1739"
            >
              <Phone className="w-5 h-5" />
            </a>
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - Full Viewport Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={closeMenu}></div>

          {/* Menu Content */}
          <div className="absolute inset-0 bg-white dark:bg-gray-900">
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <Link href="/" className="flex items-center justify-center" onClick={closeMenu}>
                  <Image
                    src="https://www.spartamortgage.com/images/Logo_Highres.jpg"
                    alt="Sparta Mortgage Logo"
                    width={135}
                    height={48}
                    className="h-9 w-auto sm:h-12 md:h-14 lg:h-16 object-contain p-2"
                    priority
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links - Centered and evenly spaced */}
              <div className="flex-1 flex flex-col justify-center px-4">
                <nav className="space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`block text-2xl font-semibold py-4 px-6 rounded-lg transition-colors text-center ${
                        pathname === link.href
                          ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                          : "text-gray-700 dark:text-gray-200 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Phone Number at Bottom */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="tel:+15028191739"
                  className="flex items-center justify-center gap-3 text-xl font-semibold py-4 px-6 rounded-lg text-gray-700 dark:text-gray-200 hover:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={closeMenu}
                >
                  <Phone className="w-6 h-6" />
                  <span>(502) 819-1739</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
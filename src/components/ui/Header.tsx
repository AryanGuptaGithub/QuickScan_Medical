"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiPhone,
  FiMapPin,
  FiLogOut,
} from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 ">
      <div className=" w-full  ">
        {/* Top Bar */}
        <div className="bg-black text-white py-2 px-4 w-full border-2 h-12 flex flex-col justify-center ">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 ml-10 ">
              <div className="flex items-center ">
                <FiPhone className="mr-2" />
                <span>Call: 1800-123-4567</span>
              </div>
              <div className="hidden md:flex items-center">
                <FiMapPin className="mr-2" />
                <span>950+ Scan Centers Across India</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center hover:text-yellow-500  text-white no-underline"
                  >
                    <FiUser className="mr-1" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-red-500 mr-11 hover:text-white transition-all duration-200 text-red-500 flex items-center bg-white px-5 py-2 rounded-2xl border-0 font-semibold"
                  >
                    <FiLogOut className="mr-1 " />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center hover:text-blue-200 text-white no-underline"
                  >
                    <FiUser className="mr-1" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm bg-white text-blue-600 px-3 py-1 rounded font-semibold no-underline mr-15"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="py-4 px-4 container-custom">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              <MdLocalHospital className="text-blue-600 text-3xl" />
              <div>
                <h1 className="text-2xl font-bold text-blue-600 ">QuickScan</h1>
                <p className="text-xs text-gray-600 ">Medical Diagnostics</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition duration-300 no-underline ${
                    pathname === link.href
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <div className="flex flex-col space-y-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium ${
                      pathname === link.href ? "text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Auth Links in Mobile */}
                <div className="pt-4 border-t">
                  {status === "authenticated" ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center mb-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiUser className="mr-2" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center text-red-600"
                      >
                        <FiLogOut className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block mb-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="btn-primary inline-block text-center w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const navLinks = [
  { name: "Home", href: "/" },
  { name: "MRI Scan", href: "/services/mri-scan" },
  { name: "CT Scan", href: "/services/ct-scan" },
  { name: "Health Checkup", href: "/services/health-checkup" },
  { name: "Labs", href: "/labs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default Header;

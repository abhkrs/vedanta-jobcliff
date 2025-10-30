"use client";
import Image from "next/image";
import { Search, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import PreloaderLink from "./PreloaderLink";
import HeaderScroll from "./HeaderScroll";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  // Check if we're on a portal-specific page (dashboard, assignments, interviews, etc.)
  const isPortalPage = [
    "/dashboard",
    "/assignments",
    "/interviews",
    "/saved-jobs",
    "/job-detail",
  ].some((path) => pathname.startsWith(path));

  const menuItems = [
    { name: "About Us", href: "/about-us" },
    { name: "Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Blogs", href: "/blogs" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {isHomePage && (
        <HeaderScroll text="🎉 Jobcliff goes live on 01st Nov'25. Stay Tuned" />
      )}
      <header className="sticky top-0 z-[999999999] pb-2 pt-1 shadow-xs backdrop-blur-md bg-[#f5f9fb] border-b border-[#CDCDCD]">
        <nav className="container flex items-center justify-between">
          <PreloaderLink href="/" className="flex">
            <Image src="/logo-new.png" alt="Logo" width={280} height={60} />
          </PreloaderLink>

          {!isPortalPage && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <PreloaderLink
                    key={item.name}
                    href={item.href}
                    className={`relative pb-0.5 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-prime after:transition-all after:duration-300 hover:after:w-full ${
                      pathname === item.href
                        ? "text-prime after:w-full"
                        : "text-black hover:text-prime after:w-0"
                    }`}
                  >
                    {item.name}
                  </PreloaderLink>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2.5 rounded-full bg-white text-prime border-prime border hover:bg-prime hover:text-white transition-colors duration-300">
                  <Search size={20} />
                </button>
                <PreloaderLink
                  href="/login"
                  className="text-prime font-medium px-6 py-2 rounded-full border-prime border hover:bg-prime hover:text-white transition-colors duration-300"
                >
                  Login
                </PreloaderLink>
                <PreloaderLink
                  href="/join"
                  className="bg-prime text-white px-4 py-2 rounded-full hover:bg-prime/90 font-medium border-prime border transition-colors duration-300"
                >
                  Join For Free
                </PreloaderLink>
                <div className="h-9 border-r border-gray-200"></div>
                <button className="p-2.5 rounded-full bg-prime/20 text-prime hover:bg-prime hover:text-white transition-colors duration-300">
                  <Globe size={20} />
                </button>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

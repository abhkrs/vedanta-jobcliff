import Link from "next/link";
import Image from "next/image";
import PreloaderLink from "./PreloaderLink";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Blogs", href: "/blogs" },
  ];

  const additionalLinks = [
    { label: "Register College for Internship", href: "/register-college" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contacts", href: "/contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container pt-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="lg:col-span-3">
            <Image
              src="/logo-new.png"
              alt="Vedanta Foundation"
              width={280}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="lg:col-span-5 md:grid md:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-black  mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <PreloaderLink
                      href={link.href}
                      className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                    >
                      {link.label}
                    </PreloaderLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links */}
            <div>
              <h3 className="font-semibold text-black  mb-4 opacity-0">
                Links
              </h3>
              <ul className="space-y-2">
                {additionalLinks.map((link) => (
                  <li key={link.href}>
                    <PreloaderLink
                      href={link.href}
                      className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                    >
                      {link.label}
                    </PreloaderLink>
                  </li>
                ))}
                <li>
                  <PreloaderLink
                    href="/join"
                    className="inline-block px-4 py-1 bg-sec/15 text-sec text-sm font-semibold rounded hover:bg-sec hover:text-white transition-all duration-300"
                  >
                    Hire Interns
                  </PreloaderLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Reach Out */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-black  mb-4">Reach Out</h3>
            <ul className="space-y-2">
              <li className="text-sm text-[#1E1515]">
                Phone:{" "}
                <Link
                  href="tel:+19876542112"
                  className="inline-block hover:text-sec hover:translate-x-1 transition-all duration-300"
                >
                  +1 98765 42112
                </Link>
              </li>
              <li className="text-sm text-[#1E1515]">
                Email:{" "}
                <Link
                  href="mailto:info@gmail.com"
                  className="inline-block hover:text-sec hover:translate-x-1 transition-all duration-300"
                >
                  info@gmail.com
                </Link>
              </li>
              <li className="text-sm text-[#1E1515]">
                Address: Street 20, Western Highway, USA
              </li>
            </ul>
          </div>
        </div>
        <div className="border-y border-gray-200 h-1 mb-5"></div>
        {/* Middle Section - Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          {/* In-demand Careers */}
          <div>
            <h3 className="font-semibold text-black  mb-4">
              In-demand Careers
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Data Scientist", href: "/careers/data-scientist" },
                { label: "Full Stack", href: "/careers/full-stack" },
                { label: "Web Developer", href: "/careers/web-developer" },
                { label: "Cloud Engineer", href: "/careers/cloud-engineer" },
                { label: "Project Manager", href: "/careers/project-manager" },
                { label: "Game Developer", href: "/careers/game-developer" },
              ].map((item) => (
                <li key={item.href}>
                  <PreloaderLink
                    href={item.href}
                    className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                  </PreloaderLink>
                </li>
              ))}
              <li>
                <PreloaderLink
                  href="/careers"
                  className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                >
                  See all Career Acceleratorabs
                </PreloaderLink>
              </li>
            </ul>
          </div>

          {/* Job By Places */}
          <div>
            <h3 className="font-semibold text-black  mb-4">Job By Places</h3>
            <ul className="space-y-2">
              {[
                { label: "Jobs in Delhi", place: "delhi" },
                { label: "Jobs in Mumbai", place: "mumbai" },
                { label: "Jobs in Bangalore", place: "bangalore" },
                { label: "Jobs in Jaipur", place: "jaipur" },
                { label: "Jobs in Kolkata", place: "kolkata" },
                { label: "Jobs in Hyderabad", place: "hyderabad" },
              ].map((item) => (
                <li key={item.place}>
                  <PreloaderLink
                    href={`/jobs?place=${item.place}`}
                    className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                  </PreloaderLink>
                </li>
              ))}
              <li>
                <PreloaderLink
                  href="/jobs"
                  className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                >
                  View all Jobs
                </PreloaderLink>
              </li>
            </ul>
          </div>

          {/* Jobs by Stream */}
          <div>
            <h3 className="font-semibold text-black  mb-4">Jobs by Stream</h3>
            <ul className="space-y-2">
              {[
                { label: "Marketing Jobs", stream: "marketing" },
                { label: "Content Writing Jobs", stream: "content-writing" },
                { label: "Web Development Jobs", stream: "web-development" },
                { label: "Sales Jobs", stream: "sales" },
                { label: "Finance Jobs", stream: "finance" },
                {
                  label: "Digital Marketing Jobs",
                  stream: "digital-marketing",
                },
              ].map((item) => (
                <li key={item.stream}>
                  <PreloaderLink
                    href={`/jobs?stream=${item.stream}`}
                    className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                  </PreloaderLink>
                </li>
              ))}
              <li>
                <PreloaderLink
                  href="/jobs"
                  className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                >
                  View all Jobs
                </PreloaderLink>
              </li>
            </ul>
          </div>

          {/* Placement Guarantee Courses */}
          <div>
            <h3 className="font-semibold text-black  mb-4">
              Placement Guarantee Courses
            </h3>
            <ul className="space-y-2">
              {[
                {
                  label: "Full Stack Development",
                  href: "/courses/full-stack-development",
                },
                { label: "Data Science", href: "/courses/data-science" },
                {
                  label: "Human Resource Management",
                  href: "/courses/hr-management",
                },
                {
                  label: "Digital Marketing",
                  href: "/courses/digital-marketing",
                },
                {
                  label: "Electric Vehicle",
                  href: "/courses/electric-vehicle",
                },
                { label: "UI/UX Design", href: "/courses/ui-ux-design" },
              ].map((item) => (
                <li key={item.href}>
                  <PreloaderLink
                    href={item.href}
                    className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                  </PreloaderLink>
                </li>
              ))}
              <li>
                <PreloaderLink
                  href="/courses"
                  className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
                >
                  View all Jobs
                </PreloaderLink>
              </li>
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        <div className="flex flex-wrap gap-1 mt-5 mb-8">
          <Link
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/google-play.png"
              alt="Get it on Google Play"
              width={180}
              height={50}
              className="h-14 w-auto"
            />
          </Link>
          <Link
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/app-store.png"
              alt="Available on the App Store"
              width={180}
              height={50}
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6  border-t border-gray-200">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy" },
              { label: "Cookies", href: "/cookies" },
              { label: "Legal", href: "/legal" },
            ].map((link) => (
              <PreloaderLink
                key={link.href}
                href={link.href}
                className="inline-block text-sm text-[#1E1515] hover:text-sec hover:translate-x-1 transition-all duration-300"
              >
                {link.label}
              </PreloaderLink>
            ))}
          </div>
          <p className="text-sm text-[#1E1515]">
            © 2025 Copyright. All Rights Reserved. Designed & Developed by <Link className="hover:text-sec hover:underline" href="https://www.innovins.com/" target="_blank">Innovins</Link>
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-black hover:border-red-600 hover:text-red-600 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-black hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-black hover:border-pink-600 hover:text-pink-600 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-black hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

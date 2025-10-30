import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PreloaderProvider } from "@/components/PreloaderContext";
import { AnimationProvider } from "@/components/AnimationContext";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "JobCliff - Vedanta Foundation",
  description: "Job portal for Vedanta Foundation",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <PreloaderProvider>
          <AnimationProvider>
            <PageTransition>
              <div className="bg-linear-gradient-to-br from-prime/30 via-prime/10 to-white flex flex-col min-h-screen justify-between">
                <Header />
                <main className="mb-auto">{children}</main>
                <Footer />
              </div>
            </PageTransition>
          </AnimationProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ top: "66px", right: "2px" }}
          />
        </PreloaderProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/user/admin/Sidebar";
import { Suspense } from "react";
import LoadingPage from "../loading";
import { ProductProvider } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <ProductProvider>
        <div className="flex flex-1 lg:flex-row flex-col min-h-screen w-full">
          <div className="lg:w-1/6 w-full bg-side-sidebar-bg lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
            <SideBar />
          </div>
          <main className="lg:w-5/6 flex-grow overflow-y-auto overflow-x-auto lg:overflow-x-hidden">
            <Suspense fallback={<LoadingPage />}>{children}</Suspense>
          </main>
        </div>
      </ProductProvider>
    </div>
  );
}

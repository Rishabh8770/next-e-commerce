import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoadingPage from "../loading";
import ProfileSideBar from "@/components/myProfile/ProfileSideBar";

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
      <div className="flex flex-1 lg:flex-row flex-col min-h-screen w-full">
        <div className="lg:w-1/4 w-full bg-side-sidebar-bg lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
          <ProfileSideBar />
        </div>
        <main className="flex-grow overflow-y-auto lg:w-3/4">
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
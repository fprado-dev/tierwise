import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MagicLinkHandler from "./sign-in/MagicLinkHandler";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex">
      <MagicLinkHandler />


      {/* Authentication panel */}
      <div className="w-full flex flex-col justify-center">
        <div className="max-w-md mx-auto flex flex-col items-center w-full">
          <Link href={"/"}>
            <Image priority className="cursor-pointer hover:rotate-2 h-20 w-60 transition-transform" height={80} width={240} alt="TierWise Logo" src="/logo-full.png" />
          </Link>

          <div className=" w-full">
            <Suspense fallback={<div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">Loading...</div>}>
              {children}
            </Suspense>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <p>© 2025 TierWise</p>
          </div>
        </div>
      </div>
    </div>
  );
}

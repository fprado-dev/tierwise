import Image from "next/image";
import MagicLinkHandler from "./sign-in/MagicLinkHandler";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex">
      <MagicLinkHandler />
      {/* Brand panel - extremely minimal */}


      {/* Authentication panel */}
      <div className="w-full flex flex-col justify-center">
        <div className="max-w-md mx-auto  flex flex-col items-center w-full">
          <Image height={96} width={240} alt="TierWise Logo" src="/logo-full.png" />
          <p className="text-sm text-gray-500 mt-4">Welcome! A Magic link will be sent to your email</p>

          {/* Auth form */}
          <div className=" w-full px-4">
            {children}
          </div>

          {/* Minimal footer */}
          <div className="pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <p>© 2025 TierWise</p>
          </div>
        </div>
      </div>
    </div>
  );
}

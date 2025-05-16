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
        <div className="max-w-md mx-auto  flex flex-col  items-center w-full">
          <Image height={96} width={96} alt="TierWise Logo" src="/icon-logo.svg" />
          <h2 className="text-2xl font-medium text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">A Magic link will be sent to your email</p>

          {/* Auth form */}
          <div className="space-y-4 w-full px-4">
            {children}
          </div>

          {/* Minimal footer */}
          <div className="mt-12 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <p>© 2025 TierWise</p>
            <div className="space-x-4">
              <a href="#" className="hover:text-gray-600">Help</a>
              <a href="#" className="hover:text-gray-600">Privacy</a>
              <a href="#" className="hover:text-gray-600">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

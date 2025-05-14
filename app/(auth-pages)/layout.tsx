import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Brand panel - extremely minimal */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-300 flex-col justify-center p-12">
        <div className="max-w-md mx-auto">
          {/* Simple logo */}
          <div className="flex items-center mb-8">
            <Image height={60} width={60} alt="TierWise Logo" src="/favicon-96x96.png" />
            <h1 className="ml-3 text-xl font-medium text-gray-900">TierWise</h1>
          </div>

          {/* Simple headline and description */}
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Pricing optimization made simple
          </h2>

          <p className="text-gray-500">
            Create data-driven pricing structures that maximize revenue
          </p>
        </div>
      </div>

      {/* Authentication panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="max-w-sm mx-auto px-6 w-full">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-12">
            <Image height={96} width={96} alt="TierWise Logo" src="/favicon-96x96.png" />
            <h1 className="ml-2 text-lg font-medium text-gray-900">TierWise</h1>
          </div>

          {/* Simple welcome text */}
          <h2 className="text-2xl font-medium text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to your account</p>

          {/* Auth form */}
          <div className="space-y-6">
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

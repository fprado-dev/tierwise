export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Brand Section */}
      <div className="hidden lg:flex w-1/2 bg-[#0d1b2a] p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#778da9] to-[#e0e1dd] mb-4">TierWise</h1>
          <p className="text-[#778da9] text-lg">Transform your pricing strategy with confidence</p>
        </div>
        <div className="text-[#778da9]">
          <p className="text-sm">Trusted by leading companies worldwide</p>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-background">
        <div className="w-full max-w-sm space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

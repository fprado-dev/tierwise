import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message>; }) {
  const searchParams = await props.searchParams;
  return (
    <form className="w-full">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            type="email"
            required
            className="w-full transition-colors focus:border-blue-600"
          />
        </div>
        <SubmitButton
          pendingText="Sending magic link..."
          formAction={signInAction}
          className="w-full bg-[#0d1b2a] hover:bg-[#0d1b2a]/90 text-white py-2 rounded-md transition-colors"
        >
          Continue with Email
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

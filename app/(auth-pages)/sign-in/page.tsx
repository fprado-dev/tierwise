import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message>; }) {
  const searchParams = await props.searchParams;
  return (
    <form className="w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-sidebar">Email address</Label>
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
          className="w-full bg-gradient-to-r from-violet-500  to-purple-800 hover:opacity-90 hover:scale-105 transition-all text-white py-2 rounded-md "
        >
          Continue with Email
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

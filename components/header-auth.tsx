import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (user) {
    <div className="flex items-center gap-4">
      <span className="text-xs"> Hey, <b>{user.email}</b>!</span>
      <form action={signOutAction}>
        <Button className="text-xs" type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>;
  }

}

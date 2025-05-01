import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function SignIn() {
  return (
    <div className="bg-secondary h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <Button type="submit">Sign in with Google</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h1 className="text-dark500_light500 mt-20">Hello {session?.user?.name}</h1>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
}

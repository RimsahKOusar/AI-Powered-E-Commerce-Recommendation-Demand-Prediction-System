import { ProfileForm } from "@/components/account/ProfileForm";
import { requireUser } from "@/lib/dal";

export const metadata = { title: "My profile" };

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-5 text-xl font-bold text-foreground">My profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}

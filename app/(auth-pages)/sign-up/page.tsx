import { FormMessage, Message } from "@/components/form-message";
import SignUpForm from "@/app/(auth-pages)/sign-up/SignUpForm";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-w-64 max-w-64 mx-auto">
      <SignUpForm />
      <FormMessage message={searchParams} />
    </div>
  );
}

import { FormMessage, Message } from "@/components/form-message";
import SignUpForm from "@/app/(auth-pages)/sign-up/SignUpForm";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-w-64 max-w-64 mx-auto">
      <SignUpForm />
      <FormMessage message={searchParams} />
    </div>
  );
}

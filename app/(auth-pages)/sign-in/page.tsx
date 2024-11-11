import { FormMessage, Message } from "@/components/form-message";
import SignInForm from "@/app/(auth-pages)/sign-in/SignInForm";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-w-64 max-w-64 mx-auto">
      <SignInForm />
      <FormMessage message={searchParams} />
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-6xl font-bold text-primary-brand">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Could not find requested resource.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center px-4 py-2 bg-primary-brand text-white rounded-md"
      >
        <ArrowLeft size={16} className="mr-2" />
        Return Home
      </Link>
    </div>
  );
}

import { Activity } from "lucide-react";
import TypewriterComponent from "@/components/typewriter-component";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium gap-3">
            <Activity />
            AIDA
          </div>
          <div className="relative z-20 mt-56">
            <TypewriterComponent />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This web app has saved me countless hours of work and
                helped me make diagnosis of chronic kidney disease.&rdquo;
              </p>
              <footer className="text-sm">Simen Wergeland</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">{children}</div>
      </div>
    </>
  );
}

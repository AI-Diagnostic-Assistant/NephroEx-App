import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  icon: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  badge?: React.ReactNode;
};

export default function ExplanationModule(props: Props) {
  const { title, icon, description, children, className, badge } = props;
  return (
    <Card className={cn("rounded-lg", className)}>
      <CardHeader className="p-4">
        <CardTitle className="flex gap-1 items-center text-foreground">
          {icon}
          <div className="flex justify-between w-full items-center">
            <h4>{title}</h4>
            {badge}
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  );
}

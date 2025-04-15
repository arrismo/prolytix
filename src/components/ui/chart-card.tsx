
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export function ChartCard({
  title,
  description,
  children,
  className,
  footer,
}: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          {children}
        </div>
        {footer && (
          <div className="border-t border-border p-4 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

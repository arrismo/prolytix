
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DataCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
}

export function DataCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: DataCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "mr-1",
                trend.positive ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

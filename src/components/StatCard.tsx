import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {value}
        </div>
        {trend && (
          <p className={`text-xs mt-1 ${trend.isPositive ? 'text-secondary' : 'text-destructive'}`}>
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

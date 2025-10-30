import { Trophy, DollarSign, Users, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Mock data
  const stats = [
    {
      title: 'Total Reports',
      value: '248',
      icon: Trophy,
      trend: { value: '+12% from last month', isPositive: true },
    },
    {
      title: 'Winners (30 days)',
      value: '42',
      icon: Users,
      trend: { value: '+8% from last month', isPositive: true },
    },
    {
      title: 'Cards Sold',
      value: '12,456',
      icon: TrendingUp,
      trend: { value: '+15% from last month', isPositive: true },
    },
    {
      title: 'Total Jackpots',
      value: '$245,890',
      icon: DollarSign,
      trend: { value: '+18% from last month', isPositive: true },
    },
  ];

  const recentReports = [
    { id: 1, date: '2025-10-28', winner: 'John Smith', cards_sold: 450, ending_jackpot: 5200 },
    { id: 2, date: '2025-10-27', winner: 'Sarah Johnson', cards_sold: 520, ending_jackpot: 6800 },
    { id: 3, date: '2025-10-26', winner: 'Mike Davis', cards_sold: 380, ending_jackpot: 4500 },
    { id: 4, date: '2025-10-25', winner: 'Emily Brown', cards_sold: 490, ending_jackpot: 5900 },
    { id: 5, date: '2025-10-24', winner: 'David Wilson', cards_sold: 510, ending_jackpot: 6200 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your jackpot reporting system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Recent Reports</CardTitle>
          <Link to="/reports">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Winner</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Cards Sold</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Jackpot</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4 text-sm">{report.date}</td>
                    <td className="py-4 px-4 text-sm font-medium">{report.winner}</td>
                    <td className="py-4 px-4 text-sm text-right">{report.cards_sold.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-right font-semibold text-accent">
                      ${report.ending_jackpot.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

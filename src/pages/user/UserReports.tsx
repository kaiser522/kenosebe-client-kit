import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { Report } from '@/types';

export default function UserReports() {
  const { user } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - includes reports from multiple organizations
  const allReports: Report[] = [
    {
      id: 1,
      date: '2025-10-28',
      winner: 'John Smith',
      cards_sold: 450,
      starting_jackpot: 3000,
      ending_jackpot: 5200,
      loyalty_payout: 200,
      charity_payout: 150,
      organization: 1,
      created_at: '2025-10-28T10:00:00Z',
      updated_at: '2025-10-28T10:00:00Z',
    },
    {
      id: 2,
      date: '2025-10-27',
      winner: 'Sarah Johnson',
      cards_sold: 520,
      starting_jackpot: 3500,
      ending_jackpot: 6800,
      loyalty_payout: 250,
      charity_payout: 180,
      organization: 1,
      created_at: '2025-10-27T10:00:00Z',
      updated_at: '2025-10-27T10:00:00Z',
    },
    {
      id: 3,
      date: '2025-10-26',
      winner: 'Mike Davis',
      cards_sold: 380,
      starting_jackpot: 2800,
      ending_jackpot: 4500,
      loyalty_payout: 180,
      charity_payout: 120,
      organization: 2,
      created_at: '2025-10-26T10:00:00Z',
      updated_at: '2025-10-26T10:00:00Z',
    },
    {
      id: 4,
      date: '2025-10-25',
      winner: 'Emily Brown',
      cards_sold: 600,
      starting_jackpot: 4000,
      ending_jackpot: 7500,
      loyalty_payout: 300,
      charity_payout: 220,
      organization: 2,
      created_at: '2025-10-25T10:00:00Z',
      updated_at: '2025-10-25T10:00:00Z',
    },
  ];

  // Get user's organization ID
  const userOrgId = typeof user?.organization === 'number' ? user.organization : user?.organization?.id;

  // Filter reports: ONLY show reports from user's organization
  const filteredReports = allReports.filter(report => {
    const reportOrgId = typeof report.organization === 'number' ? report.organization : report.organization.id;
    
    const matchesOrg = userOrgId === reportOrgId;
    const matchesSearch = report.winner.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesOrg && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            My Organization Reports
          </h1>
          <p className="text-muted-foreground">
            View jackpot reports for your organization
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by winner name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Organization Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Winner</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Cards Sold</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Starting</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ending</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Loyalty</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Charity</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4 text-sm">{report.date}</td>
                    <td className="py-4 px-4 text-sm font-medium">{report.winner}</td>
                    <td className="py-4 px-4 text-sm text-right">{report.cards_sold.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-right text-muted-foreground">
                      ${report.starting_jackpot.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-right font-semibold text-accent">
                      ${report.ending_jackpot.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-secondary">
                      ${report.loyalty_payout.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-right text-secondary">
                      ${report.charity_payout.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reports found for your organization.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

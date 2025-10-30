import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Organizations() {
  // Mock data
  const organizations = [
    {
      id: 1,
      name: 'Main Hall',
      description: 'Primary gaming venue',
      is_active: true,
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: 'West Side Lounge',
      description: 'Secondary location for special events',
      is_active: true,
      created_at: '2024-03-20T10:00:00Z',
    },
    {
      id: 3,
      name: 'VIP Room',
      description: 'Exclusive member area',
      is_active: false,
      created_at: '2024-05-10T10:00:00Z',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Organizations
          </h1>
          <p className="text-muted-foreground">
            Manage gaming venues and locations
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          New Organization
        </Button>
      </div>

      {/* Organizations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Card key={org.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{org.name}</CardTitle>
                  <Badge variant={org.is_active ? 'default' : 'secondary'}>
                    {org.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{org.description}</p>
              <p className="text-xs text-muted-foreground">
                Created: {new Date(org.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

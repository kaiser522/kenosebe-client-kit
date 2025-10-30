import { Plus, Edit, Trash2, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Users() {
  // Mock data
  const users = [
    {
      id: 1,
      username: 'admin',
      first_name: 'John',
      last_name: 'Admin',
      email: 'admin@kenosabe.com',
      role: 'ADMIN' as const,
      organization: 'Main Hall',
      created_at: '2024-01-01T10:00:00Z',
    },
    {
      id: 2,
      username: 'manager1',
      first_name: 'Sarah',
      last_name: 'Manager',
      email: 'sarah@kenosabe.com',
      role: 'USER' as const,
      organization: 'Main Hall',
      created_at: '2024-02-15T10:00:00Z',
    },
    {
      id: 3,
      username: 'clerk1',
      first_name: 'Mike',
      last_name: 'Clerk',
      email: 'mike@kenosabe.com',
      role: 'USER' as const,
      organization: 'West Side Lounge',
      created_at: '2024-03-20T10:00:00Z',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Users
          </h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Full Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Organization</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium">{user.username}</td>
                    <td className="py-4 px-4 text-sm">{user.first_name} {user.last_name}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm">{user.organization}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

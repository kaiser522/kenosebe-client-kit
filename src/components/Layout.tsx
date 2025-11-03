import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Users, 
  UserCircle, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout as logoutAction } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isAdmin = user?.role === 'ADMIN';
  
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Reports', href: '/reports', icon: FileText },
    ...(isAdmin ? [
      { name: 'Organizations', href: '/organizations', icon: Building2 },
      { name: 'Users', href: '/users', icon: Users },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="KenoSabe" className="h-12 w-auto" />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-glow'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-sm text-right">
                <p className="font-medium">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
              <Link to="/profile">
                <Button variant="outline" size="icon">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card p-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="border-t border-border pt-2 mt-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <UserCircle className="h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

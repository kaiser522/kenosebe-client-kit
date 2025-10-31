import { useAuth } from '@/contexts/AuthContext';
import AdminReports from './admin/AdminReports';
import UserReports from './user/UserReports';

export default function Reports() {
  const { isAdmin } = useAuth();

  // Route to appropriate component based on user role
  return isAdmin ? <AdminReports /> : <UserReports />;
}

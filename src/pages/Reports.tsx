import { useAppSelector } from '@/store/hooks';
import AdminReports from './admin/AdminReports';
import UserReports from './user/UserReports';

export default function Reports() {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  // Route to appropriate component based on user role
  return isAdmin ? <AdminReports /> : <UserReports />;
}

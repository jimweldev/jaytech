import { Outlet } from 'react-router';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import { Button } from '@/components/ui/button';

const GuestLayout = () => {
  const { clearAuthUser } = useAuthUserStore();
  return (
    <div>
      <Button onClick={clearAuthUser}>Logout</Button>
      <br />
      guest layout
      <Outlet />
    </div>
  );
};

export default GuestLayout;

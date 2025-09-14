import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import useTanstackQuery from '@/hooks/tanstack/use-tanstack-query';

const PrivateLayout = () => {
  const navigate = useNavigate();

  const { token } = useAuthUserStore();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const { data } = useTanstackQuery({
    endpoint: '/notifications/unread-count',
  });

  return <Outlet />;
};

export default PrivateLayout;

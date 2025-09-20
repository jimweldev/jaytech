import { Outlet } from 'react-router';
import CustomerTemplate from '@/03_templates/customer-template/customer-template';

const CustomerLayout = () => {
  return (
    <CustomerTemplate>
      <Outlet />
    </CustomerTemplate>
  );
};

export default CustomerLayout;

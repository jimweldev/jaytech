import { Outlet } from 'react-router';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import CardTabList from '@/components/tabs/card-tab/card-tab-list';
import CardTabTrigger from '@/components/tabs/card-tab/card-tab-trigger';
import PageHeader from '@/components/typography/page-header';
import { Card, CardBody } from '@/components/ui/card';
import LoginToContinueShopping from '../_components/login-to-continue-shopping-component';

const BagPage = () => {
  const { user } = useAuthUserStore();

  return (
    <div>
      <PageHeader className="mb-3">Bag</PageHeader>

      {!user ? (
        <Card>
          <CardBody>
            <LoginToContinueShopping />
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardTabList>
            <CardTabTrigger to="/bag/all">All</CardTabTrigger>
            <CardTabTrigger to="/bag/to-pay">To Pay</CardTabTrigger>
            <CardTabTrigger to="/bag/to-ship">To Ship</CardTabTrigger>
            <CardTabTrigger to="/bag/to-receive">To Receive</CardTabTrigger>
            <CardTabTrigger to="/bag/completed">Completed</CardTabTrigger>
            <CardTabTrigger to="/bag/cancelled">Cancelled</CardTabTrigger>
          </CardTabList>
          <CardBody>
            <Outlet />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BagPage;

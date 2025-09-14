import { FaUsers, FaUsersGear, FaUsersSlash, FaUserTie } from 'react-icons/fa6';
import { Card, CardBody } from '@/components/ui/card';
import useTanstackQuery from '@/hooks/tanstack/use-tanstack-query';
import { formatNumber } from '@/lib/number/format-number';
import type { Statistic } from '../_types/statistic';

// Component to display statistics cards for the admin dashboard
const DashboardStatisticsComponent = () => {
  // Fetch statistics data from API
  const { data } = useTanstackQuery<Statistic>({
    endpoint: '/dashboard/statistics',
  });

  return (
    <div className="gap-layout grid grid-cols-12">
      {/* Card showing total active users */}
      <Card className="relative col-span-12 @lg/main:col-span-6 @3xl/main:col-span-3">
        <CardBody>
          <h6 className="text-muted-foreground mb-3 text-lg font-semibold">
            Users
          </h6>
          <p className="text-3xl font-bold">{formatNumber(data?.users, 0)}</p>
          <FaUsers className="text-muted-foreground/50 absolute top-3 right-3 size-8" />
        </CardBody>
      </Card>

      {/* Card showing deleted/soft-deleted users */}
      <Card className="relative col-span-12 @lg/main:col-span-6 @3xl/main:col-span-3">
        <CardBody>
          <h6 className="text-muted-foreground mb-3 text-lg font-semibold">
            Deleted Users
          </h6>
          <p className="text-3xl font-bold">
            {formatNumber(data?.deleted_users, 0)}
          </p>
          <FaUsersSlash className="text-muted-foreground/50 absolute top-3 right-3 size-8" />
        </CardBody>
      </Card>

      {/* Card showing admin users */}
      <Card className="relative col-span-12 @lg/main:col-span-6 @3xl/main:col-span-3">
        <CardBody>
          <h6 className="text-muted-foreground mb-3 text-lg font-semibold">
            Admins
          </h6>
          <p className="text-3xl font-bold">{formatNumber(data?.admins, 0)}</p>
          <FaUsersGear className="text-muted-foreground/50 absolute top-3 right-3 size-8" />
        </CardBody>
      </Card>

      {/* Card showing different account types */}
      <Card className="relative col-span-12 @lg/main:col-span-6 @3xl/main:col-span-3">
        <CardBody>
          <h6 className="text-muted-foreground mb-3 text-lg font-semibold">
            Account Types
          </h6>
          <p className="text-3xl font-bold">
            {formatNumber(data?.account_types, 0)}
          </p>
          <FaUserTie className="text-muted-foreground/50 absolute top-3 right-3 size-8" />
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardStatisticsComponent;

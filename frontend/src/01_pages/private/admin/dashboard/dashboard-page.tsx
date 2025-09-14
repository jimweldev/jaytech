import PageHeader from '@/components/typography/page-header';
import DashboardAccountTypesChartComponent from './_components/dashboard-account-types-chart-component';
import DashboardStatisticsComponent from './_components/dashboard-statistics-component';
import DashboardUserRegistrationStatisticsComponent from './_components/dashboard-user-registration-statistics-component';

const DashboardPage = () => {
  return (
    <>
      <PageHeader className="mb-3">Dashboard</PageHeader>

      {/* Dashboard content area */}
      <div className="space-y-layout">
        {/* Statistics overview cards */}
        <DashboardStatisticsComponent />

        {/* Grid layout for charts */}
        <div className="gap-layout grid grid-cols-12">
          {/* User registration statistics chart */}
          <DashboardUserRegistrationStatisticsComponent />

          {/* Account types distribution chart */}
          <DashboardAccountTypesChartComponent />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

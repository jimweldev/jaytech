import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import BookingsPage from './01_pages/private/admin/bookings/bookings-page';
import DashboardPage from './01_pages/private/admin/dashboard/dashboard-page';
import DropPointPage from './01_pages/private/admin/drop-points/drop-point-page';
import MailLogsTab from './01_pages/private/admin/mails/_tabs/mail-logs/mail-logs-tab';
import MailTemplatesTab from './01_pages/private/admin/mails/_tabs/mail-templates/mail-templates-tab';
import MailsPage from './01_pages/private/admin/mails/mails-page';
import ProductsPage from './01_pages/private/admin/products/products-page';
import GlobalDropdownsTab from './01_pages/private/admin/systems/_tabs/global-dropdowns/global-dropdowns-tab';
import SystemSettingsTab from './01_pages/private/admin/systems/_tabs/system-settings/system-settings-tab';
import SystemsPage from './01_pages/private/admin/systems/systems-page';
import ActiveUsersTab from './01_pages/private/admin/users/_tabs/active-users/active-users-tab';
import ArchivedUsersTab from './01_pages/private/admin/users/_tabs/archived-users/archived-users-tab';
import PermissionsTab from './01_pages/private/admin/users/_tabs/rbac/_tabs/permissions/permissions-tab';
import RolesTab from './01_pages/private/admin/users/_tabs/rbac/_tabs/roles/roles-tab';
import RbacTab from './01_pages/private/admin/users/_tabs/rbac/rbac-tab';
import UsersPage from './01_pages/private/admin/users/users-page';
import VouchersPage from './01_pages/private/admin/vouchers/vouchers-page';
import DataTableGridPage from './01_pages/private/examples/data-table/data-table-grid-page';
import DataTableListGridPage from './01_pages/private/examples/data-table/data-table-list-grid-page';
import DataTableListPage from './01_pages/private/examples/data-table/data-table-list-page';
import CheckboxPage from './01_pages/private/examples/forms/checkbox-page';
import GlobalDropdownPage from './01_pages/private/examples/forms/global-dropdown-page';
import InputPage from './01_pages/private/examples/forms/input-page';
import RadioGroupPage from './01_pages/private/examples/forms/radio-group-page';
import ReactDropzonePage from './01_pages/private/examples/forms/react-dropzone-page';
import ReactQuillPage from './01_pages/private/examples/forms/react-quill-page';
import TextareaPage from './01_pages/private/examples/forms/textarea-page';
import PaymentPage from './01_pages/private/examples/payment/payment-page';
import HomePage from './01_pages/private/home/home-page';
import GeneralPage from './01_pages/private/settings/general-page';
import PasswordPage from './01_pages/private/settings/password-page';
import ProfilePage from './01_pages/private/settings/profile/profile-page';
import LoginPage from './01_pages/public/login-page';
import AdminLayout from './02_layouts/private/admin-layout';
import ExamplesLayout from './02_layouts/private/examples-layout';
import GuestLayout from './02_layouts/private/guest-layout';
import HomeLayout from './02_layouts/private/home-layout';
import PrivateLayout from './02_layouts/private/private-layout';
import SettingsLayout from './02_layouts/private/settings-layout';
import PublicLayout from './02_layouts/public/public-layout';
import useAuthUserStore from './05_stores/_common/auth-user-store';

const App = () => {
  const { token, user } = useAuthUserStore();

  const privateRoutes = [
    {
      element: <PrivateLayout />,
      children: [
        // ACCOUNT TYPE | MAIN
        ...(user?.account_type === 'Main'
          ? [
              // ADMIN LAYOUT
              {
                path: 'admin',
                element: <AdminLayout />,
                children: [
                  {
                    index: true,
                    element: <DashboardPage />,
                  },
                  {
                    path: 'users',
                    element: <UsersPage />,
                    children: [
                      {
                        index: true,
                        element: <Navigate to="active-users" replace />,
                      },
                      {
                        path: 'active-users',
                        element: <ActiveUsersTab />,
                      },
                      {
                        path: 'archived-users',
                        element: <ArchivedUsersTab />,
                      },
                      {
                        path: 'rbac',
                        element: <RbacTab />,
                        children: [
                          {
                            index: true,
                            element: <Navigate to="roles" replace />,
                          },
                          {
                            path: 'roles',
                            element: <RolesTab />,
                          },
                          {
                            path: 'permissions',
                            element: <PermissionsTab />,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    path: 'systems',
                    element: <SystemsPage />,
                    children: [
                      {
                        index: true,
                        element: <Navigate to="system-settings" replace />,
                      },
                      {
                        path: 'system-settings',
                        element: <SystemSettingsTab />,
                      },
                      {
                        path: 'global-dropdowns',
                        element: <GlobalDropdownsTab />,
                      },
                    ],
                  },
                  {
                    path: 'mails',
                    element: <MailsPage />,
                    children: [
                      {
                        index: true,
                        element: <Navigate to="logs" replace />,
                      },
                      {
                        path: 'logs',
                        element: <MailLogsTab />,
                      },
                      {
                        path: 'templates',
                        element: <MailTemplatesTab />,
                      },
                    ],
                  },
                  {
                    path: 'products',
                    element: <ProductsPage />,
                  },
                  {
                    path: 'vouchers',
                    element: <VouchersPage />,
                  },
                  {
                    path: 'bookings',
                    element: <BookingsPage />,
                  },
                  {
                    path: 'drop_points',
                    element: <DropPointPage />,
                  },
                ],
              },
              // HOME LAYOUT
              {
                element: <HomeLayout />,
                children: [
                  {
                    path: '',
                    element: <HomePage />,
                  },
                ],
              },
              // SETTINGS LAYOUT
              {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="profile" replace />,
                  },
                  {
                    path: 'profile',
                    element: <ProfilePage />,
                  },
                  {
                    path: 'password',
                    element: <PasswordPage />,
                  },
                  {
                    path: 'general',
                    element: <GeneralPage />,
                  },
                ],
              },
              // EXAMPLES LAYOUT
              {
                path: 'examples',
                element: <ExamplesLayout />,
                children: [
                  {
                    index: true,
                    element: <Navigate to="forms" replace />,
                  },
                  {
                    path: 'forms',
                    children: [
                      {
                        index: true,
                        element: <InputPage />,
                      },
                      {
                        path: 'textarea',
                        element: <TextareaPage />,
                      },
                      {
                        path: 'checkbox',
                        element: <CheckboxPage />,
                      },
                      {
                        path: 'radio-group',
                        element: <RadioGroupPage />,
                      },
                      {
                        path: 'react-dropzone',
                        element: <ReactDropzonePage />,
                      },
                      {
                        path: 'react-quill',
                        element: <ReactQuillPage />,
                      },
                      {
                        path: 'global-dropdown',
                        element: <GlobalDropdownPage />,
                      },
                    ],
                  },
                  {
                    path: 'data-table',
                    children: [
                      {
                        index: true,
                        element: <DataTableListPage />,
                      },
                      {
                        path: 'grid',
                        element: <DataTableGridPage />,
                      },
                      {
                        path: 'list-grid',
                        element: <DataTableListGridPage />,
                      },
                    ],
                  },
                  {
                    path: 'payment',
                    children: [
                      {
                        index: true,
                        element: <PaymentPage />,
                      },
                    ],
                  },
                ],
              },
            ]
          : []),

        // ACCOUNT TYPE | GUEST
        ...(user?.account_type === 'Guest'
          ? [
              // GUEST LAYOUT
              {
                element: <GuestLayout />,
                children: [
                  {
                    path: '',
                    element: <HomePage />,
                  },
                ],
              },
            ]
          : []),
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ];

  const publicRoutes = [
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <div>Register</div>,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ];

  const router = createBrowserRouter(!token ? publicRoutes : privateRoutes);

  return <RouterProvider router={router} />;
};

export default App;

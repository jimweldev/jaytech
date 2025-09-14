import { useState } from 'react';
import { FaCode, FaHouse, FaRegBell, FaUserGear } from 'react-icons/fa6';
import { NavLink, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppSidebarTrigger from '../sidebar/app-sidebar-trigger';
import NotificationsSheet from './_sheets/notifications-sheet';
import AppHeaderDropdown from './app-header-dropdown';

const AppHeader = () => {
  const location = useLocation();

  const excludedMainMenuPaths = ['/admin', '/examples', '/settings'];
  const isExcluded = excludedMainMenuPaths.some(path =>
    location.pathname.startsWith(path),
  );

  const mainMenuPaths = [
    {
      path: '/admin',
      icon: <FaUserGear className="text-inherit" />,
      label: 'Admin',
    },
    {
      path: '/',
      icon: <FaHouse className="text-inherit" />,
      label: 'Home',
    },
    {
      path: '/examples',
      icon: <FaCode className="text-inherit" />,
      label: 'Examples',
    },
  ];

  const [openNotificationsSheet, setOpenNotificationsSheet] =
    useState<boolean>(false);

  return (
    <>
      <header className="bg-card flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-3">
          <AppSidebarTrigger />

          <div className="flex items-center gap-3">
            <Separator orientation="vertical" className="min-h-5" />

            <div className="flex items-center gap-2">
              {mainMenuPaths.map(path =>
                path.path === '/' ? (
                  <NavLink to={path.path} key={path.path} tabIndex={-1}>
                    {() => {
                      const active = !isExcluded;
                      return (
                        <Button
                          variant={active ? 'default' : 'ghost'}
                          size="icon"
                        >
                          {path.icon}
                        </Button>
                      );
                    }}
                  </NavLink>
                ) : (
                  <NavLink to={path.path} key={path.path} tabIndex={-1}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        size="icon"
                      >
                        {path.icon}
                      </Button>
                    )}
                  </NavLink>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenNotificationsSheet(true)}
          >
            <FaRegBell />
          </Button>

          <AppHeaderDropdown />
        </div>
      </header>

      <NotificationsSheet
        open={openNotificationsSheet}
        setOpen={setOpenNotificationsSheet}
      />
    </>
  );
};

export default AppHeader;

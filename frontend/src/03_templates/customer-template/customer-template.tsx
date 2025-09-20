import { useState } from 'react';
import {
  FaBagShopping,
  FaCartShopping,
  FaGear,
  FaHouse,
  FaRightFromBracket,
  FaScrewdriverWrench,
} from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';
import LogoWithHover from '@/01_pages/public/logo-with-hover';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import ReactImage from '@/components/image/react-image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { formatName } from '@/lib/user/format-name';
import LoginDialog from './_dialogs/login-dialog';

const navItems = [
  { label: 'Home', to: '/', icon: FaHouse },
  { label: 'Services', to: '/services', icon: FaScrewdriverWrench },
  { label: 'Cart', to: '/cart', icon: FaCartShopping },
  { label: 'Bag', to: '/bag', icon: FaBagShopping },
];

type CustomerTemplateProps = {
  children: React.ReactNode;
};

const CustomerTemplate = ({ children }: CustomerTemplateProps) => {
  const { user, clearAuthUser } = useAuthUserStore();

  // Dialog States
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        {/* HEADER */}
        <div className="bg-card p-2">
          <div className="customer-container flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold">Seller Centre</p>
              <div className="h-3">
                <Separator className="bg-foreground" orientation="vertical" />
              </div>
              <p className="text-xs font-semibold">Start Selling</p>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold">Help</p>
              <div className="h-3">
                <Separator className="bg-foreground" orientation="vertical" />
              </div>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex shrink-0 items-center gap-2">
                      <p className="text-xs font-semibold">
                        Hi, {user?.first_name}
                      </p>
                      <ReactImage
                        className="outline-primary border-card inline-block size-6 items-center justify-center overflow-hidden rounded-full border-1 outline-2"
                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}${user?.avatar_path}`}
                        fallback="/images/default-avatar.png"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="font-medium">{formatName(user)}</span>
                        <span className="text-muted-foreground text-xs">
                          {user?.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/settings">
                      <DropdownMenuItem>
                        <FaGear />
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={clearAuthUser}>
                      <FaRightFromBracket />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  className="flex shrink-0 items-center gap-2"
                  onClick={() => setOpenLoginDialog(true)}
                >
                  <p className="text-xs font-semibold">Login</p>
                  <ReactImage
                    className="outline-primary border-card inline-block size-6 items-center justify-center overflow-hidden rounded-full border-1 outline-2"
                    src="/images/default-avatar.png"
                    fallback="/images/default-avatar.png"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TOP NAV - WEB VIEW */}
        <div className="bg-card gap-6 p-2">
          <div className="customer-container flex w-full items-center justify-between gap-6">
            <div className="group relative flex gap-6">
              <LogoWithHover />
            </div>

            {/* Left Nav Items */}
            <div className="hidden items-center gap-6 text-sm sm:flex">
              {navItems.map(({ label, to }) => {
                // Skip Cart and Bag
                if (label === 'Cart' || label === 'Bag') return null;

                return (
                  <div key={to} className="group relative flex-1">
                    <NavLink to={to} end>
                      {({ isActive }) => (
                        <span
                          className={`block p-2 ${
                            isActive
                              ? 'text-primary'
                              : 'group-hover:text-primary'
                          }`}
                        >
                          <span className="flex flex-col items-center justify-center">
                            <span>{label}</span>
                            <span
                              className={`bg-primary absolute bottom-1 block h-1 w-5 origin-center rounded-full transition-all duration-300 ${
                                isActive
                                  ? 'scale-x-100'
                                  : 'scale-x-0 group-hover:scale-x-100'
                              }`}
                            ></span>
                          </span>
                        </span>
                      )}
                    </NavLink>
                  </div>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <NavLink to="/cart">
                {({ isActive }) => (
                  <Button
                    className={
                      isActive ? 'text-primary hover:text-primary' : ''
                    }
                    variant="ghost"
                    size="icon"
                  >
                    <FaCartShopping />
                  </Button>
                )}
              </NavLink>

              <NavLink to="/bag">
                {({ isActive }) => (
                  <Button
                    className={
                      isActive ? 'text-primary hover:text-primary' : ''
                    }
                    variant="ghost"
                    size="icon"
                  >
                    <FaBagShopping />
                  </Button>
                )}
              </NavLink>
            </div>
          </div>
        </div>

        {/* <div className="mx-auto w-full max-w-7xl p-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="bg-card md:col-span-2 md:row-span-2 md:aspect-[12/4]">
            1
          </div>
          <div className="bg-card">2</div>
          <div className="bg-card">3</div>
        </div>
      </div> */}
        <div className="customer-container p-layout">
          {/* <Card>
          <CardBody>
            <CardTitle className="mb-2">Categories</CardTitle>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2">
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
              <div className="bg-muted relative aspect-video space-y-1 rounded-sm border-2 p-1">
                item
              </div>
            </div>
          </CardBody>
        </Card> */}
          {children}
        </div>

        {/* BOTTOM NAV - MOBILE VIEW */}
        <div className="text-muted-foreground bg-card mt-auto text-[10px] sm:hidden">
          <div className="flex">
            {navItems.map(({ label, to, icon: Icon }) => {
              // Skip Cart and Bag
              if (label === 'Cart' || label === 'Bag') return null;

              return (
                <div key={to} className="group relative flex-1">
                  <NavLink to={to} end>
                    {({ isActive }) => (
                      <span
                        className={`block p-2 ${
                          isActive ? 'text-primary' : 'group-hover:text-primary'
                        }`}
                      >
                        <span className="flex flex-col items-center justify-center">
                          <Icon className="size-4" />
                          <span>{label}</span>
                          <span
                            className={`bg-primary absolute bottom-1 block h-1 w-5 origin-center rounded-full transition-all duration-300 ${
                              isActive
                                ? 'scale-x-100'
                                : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                          ></span>
                        </span>
                      </span>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />
    </>
  );
};

export default CustomerTemplate;

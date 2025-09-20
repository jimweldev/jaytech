import {
  FaBagShopping,
  FaCartShopping,
  FaHouse,
  FaScrewdriverWrench,
} from 'react-icons/fa6';
import { NavLink } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LogoWithHover from './logo-with-hover';

const navItems = [
  { label: 'Home', to: '/login', icon: FaHouse },
  { label: 'Services', to: '/services', icon: FaScrewdriverWrench },
  { label: 'Cart', to: '/cart', icon: FaCartShopping },
  { label: 'Bag', to: '/bag', icon: FaBagShopping },
];

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* HEADER */}
      <div className="bg-card p-2">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
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
            <p className="text-xs font-semibold">Hi, Jimwel</p>
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* TOP NAV - WEB VIEW */}
      <div className="bg-card gap-6 p-2">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
          <div className="group relative flex gap-6">
            <LogoWithHover />
          </div>

          {/* Left Nav Items */}
          <div className="hidden items-center gap-6 sm:flex">
            {navItems
              .filter(({ label }) => label !== 'Cart' && label !== 'Bag')
              .map(({ label, to }) => (
                <NavLink key={to} to={to} end>
                  {({ isActive }) => (
                    <div
                      className={`text-muted-foreground flex items-center gap-1 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'text-card-foreground'
                          : 'hover:text-card-foreground'
                      }`}
                    >
                      {label}
                    </div>
                  )}
                </NavLink>
              ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <FaCartShopping />
            </Button>

            <Button variant="ghost" size="icon">
              <FaBagShopping />
            </Button>
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
      <div className="mx-auto w-full max-w-7xl p-4">
        <Card>
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
        </Card>
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
  );
};

export default LoginPage;

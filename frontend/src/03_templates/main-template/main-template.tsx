import { useRef } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from './_components/header/app-header';
import AppSidebar, {
  type SidebarGroup,
} from './_components/sidebar/app-sidebar';

type MainTemplateProps = {
  sidebarGroups: SidebarGroup[];
  children?: React.ReactNode;
};
const MainTemplate = ({ sidebarGroups, children }: MainTemplateProps) => {
  const hasRun = useRef(false);

  if (!hasRun.current) {
    document.body.style.pointerEvents = 'auto';
    hasRun.current = true;
  }

  return (
    <SidebarProvider>
      <AppSidebar sidebarGroups={sidebarGroups} />
      <main className="flex-1 overflow-hidden">
        <AppHeader />

        <div className="@container/main p-4 sm:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default MainTemplate;

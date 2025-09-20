import { cn } from '@/lib/utils';

type PageTabListProps = {
  className?: string;
  children: React.ReactNode;
};

const PageTabList = ({ className, children }: PageTabListProps) => {
  return (
    <div
      className={cn(
        'bg-muted text-muted-foreground w-fit rounded-md p-1',
        'text-xs',
        'font-medium',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageTabList;

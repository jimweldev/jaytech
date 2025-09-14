import { FaEllipsisVertical } from 'react-icons/fa6';
import { toast } from 'sonner';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MarkAllAsReadDropdownMenu = () => {
  const onMarkAllAsRead = () => {
    // Send PATCH request and show toast notifications
    toast.promise(mainInstance.patch(`/notifications/mark-all-as-read`), {
      loading: 'Loading...',
      success: () => {
        return 'Success!';
      },
      error: error => {
        // Display error message from response or fallback
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <FaEllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onMarkAllAsRead}>
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MarkAllAsReadDropdownMenu;

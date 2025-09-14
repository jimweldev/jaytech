import useNotificationStore from '@/05_stores/user/notification-store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getTimeAgoTimezone } from '@/lib/date/get-time-ago-timezone';

// Component Props
type ViewNotificationDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ViewNotificationDialog = ({
  open,
  setOpen,
}: ViewNotificationDialogProps) => {
  const { selectedNotification } = useNotificationStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true} position="center">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle>View Notification</DialogTitle>
        </DialogHeader>

        {/* Dialog body */}
        <DialogBody className="text-muted-foreground">
          <div className="mb-layout">
            <h4 className="text-sm font-semibold">
              {selectedNotification?.title}
            </h4>
            <p className="text-xs">
              {getTimeAgoTimezone(selectedNotification?.created_at)}
            </p>
          </div>

          <p className="text-sm">{selectedNotification?.message}</p>

          {/* display as html, insert dangersourly the selectedNotification?.content */}
          {selectedNotification?.content && (
            <div
              className="mt-layout"
              dangerouslySetInnerHTML={{
                __html: selectedNotification?.content ?? '',
              }}
            />
          )}
        </DialogBody>

        {/* Dialog footer */}
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewNotificationDialog;

import useProductBookingStore from '@/05_stores/user/product-booking-store';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type UpdateBookingDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const UpdateBookingDialog = ({ open, setOpen }: UpdateBookingDialogProps) => {
  const { selectedProductBooking } = useProductBookingStore();

  console.log(selectedProductBooking);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="xxl">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle>
            Booking of {selectedProductBooking?.customer?.first_name}{' '}
            {selectedProductBooking?.customer?.last_name} - (Status)
          </DialogTitle>
        </DialogHeader>

        {/* Dialog body */}
        <DialogBody className="space-y-3">
          {/* Row 1 */}
          <div className="gap-layout grid grid-cols-1 sm:grid-cols-3">
            <Field id="brand_name" label="Brand Name" value="test" />
            <Field id="model_name" label="Model Name" value="test" />
            <Field id="repair_type" label="Repair Type" value="test" />
          </div>

          {/* Row 2 */}
          <div className="gap-layout grid grid-cols-1 sm:grid-cols-3">
            <Field id="via" label="Via" value="test" />
            <Field id="drop_point" label="Drop Point" value="test" />
            <Field id="booking_date" label="Booking Date/Time" value="test" />
          </div>

          {/* Row 3 */}
          <div className="gap-layout grid grid-cols-1 sm:grid-cols-3">
            <Field id="phone" label="Phone" value="test" />
            <Field id="email" label="Email" value="test" />
          </div>

          {/* Row 4 */}
          <div className="gap-layout grid grid-cols-1 sm:grid-cols-3">
            <Field id="year" label="Year" value="test" />
            <Field id="car_model" label="Car Model" value="test" />
            <Field
              id="is_controllable_window"
              label="Can you control your windows using your key?"
              value="test"
            />
          </div>

          <p className="text-md m-0">Tracking Notes</p>
          <Card>
            <CardBody>test</CardBody>
          </Card>

          <p className="text-md m-0">Delivery Notes</p>
          <Card>
            <CardBody>test</CardBody>
          </Card>

          <div className="gap-layout grid grid-cols-1 sm:grid-cols-2">
            <div>
              <p className="text-md m-0">Notes</p>
              <Card>
                <CardBody>test</CardBody>
              </Card>
            </div>

            <div>
              <p className="text-md m-0">Amount Due</p>
              <Card>
                <CardBody>test</CardBody>
              </Card>
            </div>
          </div>
        </DialogBody>

        {/* Dialog footer */}
        <DialogFooter className="gap-layout flex justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookingDialog;

// Reusable field component
function Field({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="text" value={value} readOnly />
    </div>
  );
}
